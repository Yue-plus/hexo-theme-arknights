/// <reference path="common/base.ts" />

'use strict'

interface GiscusJsonConfig {
  origins?: string[]
  originsRegex?: string[]
  defaultCommentOrder?: 'oldest' | 'newest'
}

type GiscusMessageData = { error: string } | { discussion: any; viewer: any }

class GiscusManager {
  private messageHandlers: ((data: GiscusMessageData) => void)[] = []
  private config: GiscusJsonConfig | null = null
  private loaded = false
  private settingsLoadedPromise: Promise<any> | null = null
  private containerPromise: Promise<HTMLElement> | null = null
  private isLoading = false
  private loadStartTime: number = 0
  private showErrorTimeoutId: NodeJS.Timeout | null = null
  private activeTimeouts: Set<NodeJS.Timeout> = new Set()

  private async loadConfig(): Promise<GiscusJsonConfig | null> {
    if (this.loaded) return this.config
    try {
      const response = await fetch('/giscus.json')
      if (response.ok) {
        this.config = await response.json()
      }
    } catch (e) {
      console.warn('加载Giscus配置文件失败:', e)
    }
    this.loaded = true
    return this.config
  }

  async validateOrigin(): Promise<boolean> {
    if (typeof window === 'undefined') return true

    const currentOrigin = window.location.origin
    const settings = (window as any).giscusSettings

    if (settings?.origin === currentOrigin) return true

    const config = await this.loadConfig()
    if (!config) return true

    if (config.origins?.includes(currentOrigin)) return true

    if (config.originsRegex?.length) {
      for (const pattern of config.originsRegex) {
        try {
          if (pattern && new RegExp(pattern).test(currentOrigin)) return true
        } catch (e) {
          console.warn('无效的正则表达式模式:', pattern, e)
        }
      }
    }

    return !(config.origins?.length || config.originsRegex?.length)
  }

  private waitForGiscusSettings(timeout = 8000): Promise<any> {
    if (this.settingsLoadedPromise) {
      return this.settingsLoadedPromise
    }

    this.settingsLoadedPromise = new Promise((resolve, reject) => {
      const settings = (window as any).giscusSettings
      if (settings !== undefined) {
        resolve(settings)
        return
      }

      let timeoutId: NodeJS.Timeout
      const startTime = Date.now()
      const checkSettings = () => {
        const currentSettings = (window as any).giscusSettings

        if (currentSettings !== undefined) {
          this.activeTimeouts.delete(timeoutId)
          resolve(currentSettings)
          return
        }

        if (Date.now() - startTime > timeout) {
          this.activeTimeouts.delete(timeoutId)
          reject(new Error(`Giscus配置加载超时 (${timeout}ms)`))
          return
        }

        timeoutId = setTimeout(checkSettings, 100)
        this.activeTimeouts.add(timeoutId)
      }

      checkSettings()
    })

    return this.settingsLoadedPromise
  }

  private waitForContainer(timeout = 5000): Promise<HTMLElement> {
    if (this.containerPromise) {
      return this.containerPromise
    }

    this.containerPromise = new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout
      const checkContainer = () => {
        const container = document.querySelector('#giscus') as HTMLElement
        if (container) {
          this.activeTimeouts.delete(timeoutId)
          resolve(container)
          return
        }

        timeoutId = setTimeout(checkContainer, 100)
        this.activeTimeouts.add(timeoutId)
      }

      if (typeof document === 'undefined') {
        reject(new Error('文档对象不可用'))
        return
      }

      setTimeout(() => {
        this.activeTimeouts.delete(timeoutId)
        reject(new Error(`Giscus容器未找到 (${timeout}ms)`))
      }, timeout)

      if (document.readyState === 'loading') {
        const domContentLoadedHandler = () => {
          checkContainer()
        }
        document.addEventListener('DOMContentLoaded', domContentLoadedHandler, { once: true })
      } else {
        checkContainer()
      }
    })

    return this.containerPromise
  }

  async loadGiscusScript(): Promise<void> {
    if (this.isLoading) {
      throw new Error('Giscus脚本正在加载中')
    }

    this.isLoading = true
    this.loadStartTime = Date.now()

    this.settingsLoadedPromise = null
    this.containerPromise = null
    this.clearAllMessages()

    try {
      const [container, settings] = await Promise.all([
        this.waitForContainer(),
        this.waitForGiscusSettings()
      ])

      const existingScript = container.querySelector('script[src*="giscus.app/client.js"]')
      const existingIframe = container.querySelector('iframe.giscus-frame')
      if (existingScript) existingScript.remove()
      if (existingIframe) existingIframe.remove()

      const script = document.createElement('script')
      script.src = 'https://giscus.app/client.js'
      script.async = true

      const attributes = {
        'data-repo': settings.repo,
        'data-repo-id': settings.repoId,
        'data-category': settings.category,
        'data-category-id': settings.categoryId,
        'data-mapping': settings.mapping,
        'data-strict': settings.strict,
        'data-reactions-enabled': settings.reactionsEnabled,
        'data-emit-metadata': settings.emitMetadata,
        'data-input-position': settings.inputPosition,
        'data-lang': settings.lang,
        'data-theme': this.getGiscusTheme(document.documentElement.getAttribute('theme-mode')),
        'crossorigin': settings.crossorigin || 'anonymous'
      }

      Object.entries(attributes).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          script.setAttribute(key, String(value))
        }
      })

      container.appendChild(script)

      await new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Giscus脚本加载超时'))
        }, 15000)

        script.onload = () => {
          clearTimeout(timeoutId)
          resolve()
        }
        script.onerror = () => {
          clearTimeout(timeoutId)
          reject(new Error('Giscus脚本加载失败'))
        }
      })

      this.clearAllMessages()

    } catch (error) {
      const container = document.querySelector('#giscus') as HTMLElement
      if (container) {
        this.showErrorWithDelay(container, error as Error)
      }
      throw error
    } finally {
      this.isLoading = false
    }
  }

  private showErrorWithDelay(container: HTMLElement, error: Error): void {
    if (this.showErrorTimeoutId) {
      clearTimeout(this.showErrorTimeoutId)
    }

    this.showErrorTimeoutId = setTimeout(() => {
      const loadTime = Math.round((Date.now() - this.loadStartTime) / 1000)
      let msg = '网络连接较慢'

      if (error.message.includes('超时')) {
        msg = `加载超时 (${loadTime}秒)`
      } else if (error.message.includes('失败')) {
        msg = '网络连接失败'
      }

      const errorDiv = document.createElement('div')
      errorDiv.className = 'giscus-error-message'

      const iconDiv = document.createElement('div')
      iconDiv.className = 'giscus-error-icon'
      iconDiv.textContent = '⏳'

      const contentDiv = document.createElement('div')
      contentDiv.className = 'giscus-error-content'

      const titleDiv = document.createElement('div')
      titleDiv.className = 'giscus-error-title'
      titleDiv.textContent = '评论系统加载较慢'

      const messageDiv = document.createElement('div')
      messageDiv.className = 'giscus-error-message-text'
      messageDiv.textContent = msg

      const retryButton = document.createElement('button')
      retryButton.className = 'giscus-error-retry'
      retryButton.textContent = '重新加载'

      retryButton.addEventListener('click', () => {
        retryButton.disabled = true
        retryButton.textContent = '重新加载中...'

        const manager = (window as any).giscusManager
        if (manager?.loadGiscusScript) {
          manager.loadGiscusScript().finally(() => {
            retryButton.disabled = false
            retryButton.textContent = '重新加载'
          })
        }
      })

      contentDiv.appendChild(titleDiv)
      contentDiv.appendChild(messageDiv)
      contentDiv.appendChild(retryButton)

      errorDiv.appendChild(iconDiv)
      errorDiv.appendChild(contentDiv)

      const existingError = container.querySelector('.giscus-error-message')
      if (existingError) existingError.remove()

      container.appendChild(errorDiv)
      this.showErrorTimeoutId = null
    }, 5000)
  }

  async getDefaultCommentOrder(): Promise<'oldest' | 'newest'> {
    return (await this.loadConfig())?.defaultCommentOrder || 'oldest'
  }

  private getGiscusTheme(siteTheme: string | null): string {
    const themeConfig = (window as any).giscusThemeConfig

    if (themeConfig?.theme) return themeConfig.theme
    if (themeConfig?.light && themeConfig?.dark) {
      return siteTheme === 'dark' ? themeConfig.dark : themeConfig.light
    }

    return siteTheme === 'auto' || !siteTheme ? 'preferred_color_scheme'
      : siteTheme === 'dark' ? 'dark' : 'light'
  }

  syncTheme(theme?: string): boolean {
    return this.sendMessage({
      setConfig: {
        theme: this.getGiscusTheme(theme || document.documentElement.getAttribute('theme-mode'))
      }
    })
  }

  sendMessage(message: any): boolean {
    if (!message) return false

    const iframe = document.querySelector('iframe.giscus-frame') as HTMLIFrameElement | null
    if (!iframe?.contentWindow) return false

    try {
      iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
      return true
    } catch (e) {
      return false
    }
  }

  addMessageHandler(handler: (data: GiscusMessageData) => void): void {
    this.messageHandlers.push(handler)
  }

  removeMessageHandler(handler: (data: GiscusMessageData) => void): void {
    const index = this.messageHandlers.indexOf(handler)
    if (index > -1) this.messageHandlers.splice(index, 1)
  }

  isLoaded(): boolean {
    return !!document.querySelector('iframe.giscus-frame')
  }

  destroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('message', this.handleMessage)
    }

    if (this.showErrorTimeoutId) {
      clearTimeout(this.showErrorTimeoutId)
      this.showErrorTimeoutId = null
    }

    this.settingsLoadedPromise = null
    this.containerPromise = null
    this.messageHandlers = []
    this.isLoading = false
    this.loadStartTime = 0

    this.activeTimeouts.forEach(timeoutId => clearTimeout(timeoutId))
    this.activeTimeouts.clear()
  }

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleMessage)
    }
  }

  private handleMessage = (event: MessageEvent): void => {
    if (!event || event.origin !== 'https://giscus.app') return
    if (!(typeof event.data === 'object' && event.data?.giscus)) return

    const giscusData = event.data.giscus as GiscusMessageData

    try {
      this.messageHandlers.forEach(handler => {
        if (typeof handler === 'function') {
          handler(giscusData)
        }
      })
    } catch (e) {
      console.warn('Giscus 消息处理异常:', e)
    }
  }

  private clearAllMessages(): void {
    if (this.showErrorTimeoutId) {
      clearTimeout(this.showErrorTimeoutId)
      this.showErrorTimeoutId = null
    }

    const container = document.querySelector('#giscus') as HTMLElement
    if (container) {
      const existingError = container.querySelector('.giscus-error-message')

      if (existingError) existingError.remove()
    }
  }
}

let giscusManager: GiscusManager

if (typeof window !== 'undefined') {
  giscusManager = new GiscusManager()
    ; (window as any).giscusManager = giscusManager
}