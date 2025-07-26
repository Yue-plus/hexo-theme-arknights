/// <reference path="common/base.ts" />

'use strict'

/**
 * Giscus 配置接口
 */
interface IGiscusConfig {
  theme?: string
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  term?: string
  description?: string
  backLink?: string
  number?: number
  strict?: boolean
  reactionsEnabled?: boolean
  emitMetadata?: boolean
  inputPosition?: 'top' | 'bottom'
  lang?: string
}

/**
 * Giscus 消息接口
 */
interface IGiscusMessage {
  error?: string
  discussion?: any
  viewer?: any
}

/**
 * Giscus 管理器类
 * 提供动态配置更新、主题同步等高级功能
 */
class GiscusManager {
  private iframe: HTMLIFrameElement | null = null
  private container: HTMLElement | null = null
  private messageHandler: ((data: IGiscusMessage) => void) | null = null
  private initialized: boolean = false

  constructor() {
    this.init()
  }

  /**
   * 初始化 Giscus 管理器
   */
  private init(): void {
    // 延迟初始化，等待 DOM 完全加载
    setTimeout(() => {
      this.findElements()
      this.setupMessageListener()
      this.initialized = true
    }, 1000)
  }

  /**
   * 查找 Giscus 相关元素
   */
  private findElements(): void {
    try {
      this.container = getElement('#giscus')
      this.iframe = document.querySelector('iframe.giscus-frame')
    } catch (e) {
      // Giscus 容器不存在或未加载
    }
  }

  /**
   * 设置消息监听器
   */
  private setupMessageListener(): void {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return
      if (!(typeof event.data === 'object' && event.data.giscus)) return
      
      const giscusData = event.data.giscus as IGiscusMessage
      
      // 处理错误消息
      if (giscusData.error) {
        console.warn('Giscus Error:', giscusData.error)
      }
      
      // 调用自定义消息处理器
      if (this.messageHandler) {
        this.messageHandler(giscusData)
      }
    }

    window.addEventListener('message', handleMessage, { passive: true })
  }

  /**
   * 动态更新 Giscus 配置
   * @param config 要更新的配置项
   * @returns 是否更新成功
   */
  public updateConfig(config: IGiscusConfig): boolean {
    if (!this.initialized) {
      console.warn('GiscusManager not initialized yet')
      return false
    }

    this.findElements() // 重新查找元素（适应 PJAX）
    
    if (!this.iframe || !this.iframe.contentWindow) {
      console.warn('Giscus iframe not found or not ready')
      return false
    }

    try {
      const message = {
        giscus: {
          setConfig: config
        }
      }

      this.iframe.contentWindow.postMessage(message, 'https://giscus.app')
      return true
    } catch (error) {
      console.error('Failed to update Giscus config:', error)
      return false
    }
  }

  /**
   * 根据当前网站主题同步更新 Giscus 主题
   * @returns 是否更新成功
   */
  public syncTheme(): boolean {
    if (!this.initialized) return false

    const currentTheme = document.documentElement.getAttribute('theme-mode')
    let giscusTheme: string

    // 根据当前主题确定 Giscus 主题
    switch (currentTheme) {
      case 'dark':
        giscusTheme = 'dark'
        break
      case 'light':
        giscusTheme = 'light'
        break
      default:
        giscusTheme = 'preferred_color_scheme'
    }

    return this.updateConfig({ theme: giscusTheme })
  }

  /**
   * 设置消息事件处理器
   * @param handler 消息处理函数
   */
  public onMessage(handler: (data: IGiscusMessage) => void): void {
    this.messageHandler = handler
  }

  /**
   * 检查 Giscus 是否已加载
   * @returns 是否已加载
   */
  public isLoaded(): boolean {
    this.findElements()
    return !!(this.container && this.iframe)
  }

  /**
   * 重新初始化（用于 PJAX 页面切换）
   */
  public reinitialize(): void {
    this.iframe = null
    this.container = null
    this.init()
  }
}

// 创建全局实例
let giscusManager: GiscusManager

// 确保在适当时机创建实例
if (typeof window !== 'undefined') {
  // 延迟创建，避免阻塞页面加载
  setTimeout(() => {
    giscusManager = new GiscusManager()
    
    // 暴露到全局作用域供其他模块使用
    ;(window as any).giscusManager = giscusManager
  }, 500)
}