/// <reference path="common/base.ts" />

'use strict'

interface GiscusJsonConfig {
  origins?: string[]
  originsRegex?: string[]
}

interface GiscusSettings {
  repo?: string
  repoId?: string
  category?: string
  categoryId?: string
  mapping?: string
  strict?: string | number
  reactionsEnabled?: string | number
  emitMetadata?: string | number
  inputPosition?: string
  lang?: string
  term?: string
  discussionNumber?: string | number
  description?: string
  origin?: string
  loading?: string
  crossorigin?: string
}

type GiscusMessageData = { error: string } | { discussion: any; viewer: any }

class GiscusManager {
  private readonly giscusSrc = 'https://giscus.app/client.js'
  private readonly giscusOrigin = 'https://giscus.app'
  private readonly settingsTimeout = 8000
  private readonly scriptTimeout = 15000
  private readonly errorDelay = 5000
  private readonly loadingFallbackTimeout = 12000

  private messageHandlers: ((data: GiscusMessageData) => void)[] = []
  private config: GiscusJsonConfig | null = null
  private loaded = false
  private isLoading = false
  private loadStartTime = 0
  private showErrorTimeoutId: NodeJS.Timeout | null = null
  private loadingFallbackTimeoutId: NodeJS.Timeout | null = null

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
    const settings = (window as any).giscusSettings as GiscusSettings | undefined

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

  private getContainer(): HTMLElement | null {
    if (typeof document === 'undefined') return null
    return document.querySelector('#giscus') as HTMLElement | null
  }

  private clearErrorTimer(): void {
    if (!this.showErrorTimeoutId) return
    clearTimeout(this.showErrorTimeoutId)
    this.showErrorTimeoutId = null
  }

  private clearLoadingTimer(): void {
    if (!this.loadingFallbackTimeoutId) return
    clearTimeout(this.loadingFallbackTimeoutId)
    this.loadingFallbackTimeoutId = null
  }

  private clearLoadingMessage(container?: HTMLElement): void {
    this.clearLoadingTimer()

    const target = container || this.getContainer()
    if (!target) return

    const loadingMessage = target.querySelector('.giscus-loading-message')
    if (loadingMessage) loadingMessage.remove()
  }

  private clearErrorMessage(container?: HTMLElement): void {
    const target = container || this.getContainer()
    if (!target) return

    const errorMessage = target.querySelector('.giscus-error-message')
    if (errorMessage) errorMessage.remove()
  }

  private clearAllMessages(container?: HTMLElement): void {
    this.clearErrorTimer()
    this.clearLoadingMessage(container)
    this.clearErrorMessage(container)
  }

  private showLoadingMessage(container: HTMLElement): void {
    this.clearLoadingMessage(container)

    const loadingDiv = document.createElement('div')
    loadingDiv.className = 'giscus-loading-message'
    loadingDiv.setAttribute('aria-live', 'polite')
    loadingDiv.innerHTML = '<i class="giscus-loader" aria-hidden="true"></i><p class="giscus-loading-text">与神经网络取得连接 ...</p>'
    container.appendChild(loadingDiv)
  }

  private getErrorMessage(error: Error): string {
    const loadTime = Math.round((Date.now() - this.loadStartTime) / 1000)
    if (error.message.includes('超时')) return `神经网络响应超时 (${loadTime}秒)`
    if (error.message.includes('失败')) return '神经网络链路建立失败'
    return '神经网络链路不稳定'
  }

  private showErrorWithDelay(container: HTMLElement, error: Error): void {
    this.clearErrorTimer()

    this.showErrorTimeoutId = setTimeout(() => {
      this.clearLoadingMessage(container)

      const errorDiv = document.createElement('div')
      errorDiv.className = 'giscus-error-message'
      errorDiv.innerHTML =
        `<div class="giscus-error-content">
           <div class="giscus-error-title">神经网络连接异常</div>
           <div class="giscus-error-message-text">${this.getErrorMessage(error)}</div>
           <button class="giscus-error-retry">重新连接</button>
         </div>`

      this.clearErrorMessage(container)
      container.appendChild(errorDiv)

      const retryButton = errorDiv.querySelector('.giscus-error-retry') as HTMLButtonElement | null
      if (retryButton) {
        retryButton.addEventListener('click', () => {
          retryButton.disabled = true
          retryButton.textContent = '重新建立连接中...'
          this.loadGiscusScript().finally(() => {
            retryButton.disabled = false
            retryButton.textContent = '重新连接'
          })
        })
      }

      this.showErrorTimeoutId = null
    }, this.errorDelay)
  }

  private scheduleLoadingFallbackClear(): void {
    this.clearLoadingTimer()

    this.loadingFallbackTimeoutId = setTimeout(() => {
      this.clearLoadingMessage()
    }, this.loadingFallbackTimeout)
  }

  private waitForGiscusSettings(timeout = this.settingsTimeout): Promise<GiscusSettings> {
    return new Promise((resolve, reject) => {
      const startTime = Date.now()

      const checkSettings = () => {
        const settings = (window as any).giscusSettings as GiscusSettings | undefined

        if (settings !== undefined) {
          resolve(settings)
          return
        }

        if (Date.now() - startTime > timeout) {
          reject(new Error(`Giscus配置加载超时 (${timeout}ms)`))
          return
        }

        setTimeout(checkSettings, 100)
      }

      checkSettings()
    })
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

  private getScriptAttributes(settings: GiscusSettings): Record<string, string> {
    const attributes: Record<string, string> = {
      'data-repo': String(settings.repo),
      'data-repo-id': String(settings.repoId),
      'data-category': String(settings.category),
      'data-category-id': String(settings.categoryId),
      'data-mapping': settings.mapping || 'pathname',
      'data-strict': String(settings.strict ?? 0),
      'data-reactions-enabled': String(settings.reactionsEnabled ?? 1),
      'data-emit-metadata': String(settings.emitMetadata ?? 0),
      'data-input-position': settings.inputPosition || 'bottom',
      'data-lang': settings.lang || 'zh-CN',
      'data-theme': this.getGiscusTheme(document.documentElement.getAttribute('theme-mode')),
      'crossorigin': settings.crossorigin || 'anonymous'
    }

    if (settings.term) attributes['data-term'] = String(settings.term)
    if (settings.discussionNumber !== undefined && settings.discussionNumber !== null) {
      attributes['data-discussion-number'] = String(settings.discussionNumber)
    }
    if (settings.description) attributes['data-description'] = String(settings.description)
    if (settings.origin) attributes['data-origin'] = String(settings.origin)
    if (settings.loading) attributes['data-loading'] = String(settings.loading)

    return attributes
  }

  private appendGiscusScript(container: HTMLElement, settings: GiscusSettings): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = this.giscusSrc
      script.async = true

      const attributes = this.getScriptAttributes(settings)
      Object.entries(attributes).forEach(([key, value]) => {
        if (value !== '') script.setAttribute(key, value)
      })

      const timeoutId = setTimeout(() => {
        reject(new Error('Giscus脚本加载超时'))
      }, this.scriptTimeout)

      script.onload = () => {
        clearTimeout(timeoutId)
        resolve()
      }

      script.onerror = () => {
        clearTimeout(timeoutId)
        reject(new Error('Giscus脚本加载失败'))
      }

      container.appendChild(script)
    })
  }

  async loadGiscusScript(): Promise<void> {
    if (this.isLoading) return

    const container = this.getContainer()
    if (!container) return

    this.isLoading = true
    this.loadStartTime = Date.now()
    this.clearAllMessages(container)
    this.showLoadingMessage(container)

    try {
      const settings = await this.waitForGiscusSettings()
      if (!settings.repo || !settings.repoId || !settings.category || !settings.categoryId) {
        throw new Error('Giscus配置不完整')
      }

      const existingScript = container.querySelector(`script[src*="${this.giscusSrc}"]`)
      const existingIframe = container.querySelector('iframe.giscus-frame')
      if (existingScript) existingScript.remove()
      if (existingIframe) existingIframe.remove()

      await this.appendGiscusScript(container, settings)
      this.scheduleLoadingFallbackClear()
    } catch (error) {
      this.showErrorWithDelay(container, error as Error)
      console.warn('Giscus 加载异常:', error)
    } finally {
      this.isLoading = false
    }
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
      iframe.contentWindow.postMessage({ giscus: message }, this.giscusOrigin)
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

    this.clearErrorTimer()
    this.clearLoadingTimer()

    this.messageHandlers = []
    this.isLoading = false
    this.loadStartTime = 0
  }

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('message', this.handleMessage)
    }
  }

  private handleMessage = (event: MessageEvent): void => {
    if (!event || event.origin !== this.giscusOrigin) return
    if (!(typeof event.data === 'object' && event.data?.giscus)) return

    this.clearLoadingMessage()

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
}

let giscusManager: GiscusManager

if (typeof window !== 'undefined') {
  giscusManager = new GiscusManager()
  ; (window as any).giscusManager = giscusManager
}
