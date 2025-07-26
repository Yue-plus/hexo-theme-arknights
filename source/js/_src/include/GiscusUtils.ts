/// <reference path="GiscusManager.ts" />

'use strict'

/**
 * Giscus 工具函数
 * 提供便捷的 Giscus 操作接口
 */
namespace GiscusUtils {
  
  /**
   * 等待 Giscus 加载完成
   * @param timeout 超时时间（毫秒）
   * @returns Promise<boolean> 是否加载成功
   */
  export function waitForLoad(timeout: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      const startTime = Date.now()
      
      const checkLoaded = () => {
        if (typeof giscusManager !== 'undefined' && giscusManager.isLoaded()) {
          resolve(true)
          return
        }
        
        if (Date.now() - startTime > timeout) {
          resolve(false)
          return
        }
        
        setTimeout(checkLoaded, 100)
      }
      
      checkLoaded()
    })
  }

  /**
   * 安全地更新 Giscus 配置
   * @param config 配置项
   * @param retries 重试次数
   * @returns Promise<boolean> 是否更新成功
   */
  export async function safeUpdateConfig(config: IGiscusConfig, retries: number = 3): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      if (await waitForLoad()) {
        if (giscusManager.updateConfig(config)) {
          return true
        }
      }
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    return false
  }

  /**
   * 安全地同步主题
   * @param retries 重试次数
   * @returns Promise<boolean> 是否同步成功
   */
  export async function safeSyncTheme(retries: number = 3): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      if (await waitForLoad()) {
        if (giscusManager.syncTheme()) {
          return true
        }
      }
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    return false
  }

  /**
   * 获取当前 Giscus 状态
   * @returns 状态信息
   */
  export function getStatus(): {
    managerExists: boolean,
    isLoaded: boolean,
    hasContainer: boolean,
    hasIframe: boolean
  } {
    const managerExists = typeof giscusManager !== 'undefined'
    const hasContainer = !!document.querySelector('#giscus')
    const hasIframe = !!document.querySelector('iframe.giscus-frame')
    
    return {
      managerExists,
      isLoaded: managerExists ? giscusManager.isLoaded() : false,
      hasContainer,
      hasIframe
    }
  }

  /**
   * 调试用：打印 Giscus 状态
   */
  export function debugStatus(): void {
    const status = getStatus()
    console.group('🔧 Giscus Debug Status')
    console.log('Manager exists:', status.managerExists)
    console.log('Is loaded:', status.isLoaded)
    console.log('Has container:', status.hasContainer)
    console.log('Has iframe:', status.hasIframe)
    
    if (status.hasContainer) {
      const container = document.querySelector('#giscus')
      console.log('Container content:', container?.innerHTML?.slice(0, 200) + '...')
    }
    
    console.groupEnd()
  }
}

// 暴露到全局作用域供开发者使用
;(window as any).GiscusUtils = GiscusUtils