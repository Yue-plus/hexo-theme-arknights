/// <reference path="common/base.ts" />

'use strict'

interface GiscusJsonConfig {
  origins?: string[]
  originsRegex?: string[]
  defaultCommentOrder?: 'oldest' | 'newest'
}

type GiscusMessageData = { error: string } | { discussion: any; viewer: any }

class GiscusManager {
  private iframe: HTMLIFrameElement | null = null
  private messageHandlers: ((data: GiscusMessageData) => void)[] = []
  private errorHandlers: ((error: string) => void)[] = []
  private metadataHandlers: ((metadata: any) => void)[] = []
  private config: GiscusJsonConfig | null = null
  private loaded = false

  private async loadConfig(): Promise<GiscusJsonConfig | null> {
    if (this.loaded) return this.config
    try {
      const response = await fetch('/giscus.json')
      if (response.ok) this.config = await response.json()
    } catch {}
    this.loaded = true
    return this.config
  }

  async validateOrigin(): Promise<boolean> {
    const currentOrigin = window.location.origin
    const settings = (window as any).giscusSettings
    
    if (settings?.origin === currentOrigin) return true
    
    const config = await this.loadConfig()
    if (!config) return true
    
    if (config.origins?.includes(currentOrigin)) return true
    
    if (config.originsRegex?.length) {
      for (const pattern of config.originsRegex) {
        try {
          if (new RegExp(pattern).test(currentOrigin)) return true
        } catch {}
      }
    }
    
    return !(config.origins?.length || config.originsRegex?.length)
  }

  async getDefaultCommentOrder(): Promise<'oldest' | 'newest'> {
    return (await this.loadConfig())?.defaultCommentOrder || 'oldest'
  }

  private findIframe(): void {
    this.iframe = document.querySelector('iframe.giscus-frame')
  }

  private handleMessage = (event: MessageEvent): void => {
    if (event.origin !== 'https://giscus.app') return
    if (!(typeof event.data === 'object' && event.data.giscus)) return

    const giscusData = event.data.giscus as GiscusMessageData
    
    this.messageHandlers.forEach(handler => handler(giscusData))
    
    if ('error' in giscusData) {
      this.errorHandlers.forEach(handler => handler(giscusData.error))
    } else if ('discussion' in giscusData) {
      this.metadataHandlers.forEach(handler => handler(giscusData))
    }
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
    this.findIframe()
    if (!this.iframe?.contentWindow) return false
    try {
      this.iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app')
      return true
    } catch { return false }
  }

  setConfig(config: any): boolean {
    return this.sendMessage({ setConfig: config })
  }

  addMessageHandler(handler: (data: GiscusMessageData) => void): void {
    this.messageHandlers.push(handler)
  }

  removeMessageHandler(handler: (data: GiscusMessageData) => void): void {
    const index = this.messageHandlers.indexOf(handler)
    if (index > -1) this.messageHandlers.splice(index, 1)
  }

  addErrorHandler(handler: (error: string) => void): void {
    this.errorHandlers.push(handler)
  }

  removeErrorHandler(handler: (error: string) => void): void {
    const index = this.errorHandlers.indexOf(handler)
    if (index > -1) this.errorHandlers.splice(index, 1)
  }

  addMetadataHandler(handler: (metadata: any) => void): void {
    this.metadataHandlers.push(handler)
  }

  removeMetadataHandler(handler: (metadata: any) => void): void {
    const index = this.metadataHandlers.indexOf(handler)
    if (index > -1) this.metadataHandlers.splice(index, 1)
  }

  isLoaded(): boolean {
    this.findIframe()
    return !!this.iframe
  }

  loadGiscusScript(): void {
    const container = document.querySelector('#giscus')
    if (!container) return
    
    container.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    
    const settings = (window as any).giscusSettings
    if (settings) {
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
        if (value) script.setAttribute(key, value)
      })
      
      const optionalAttrs = ['term', 'discussionNumber', 'description', 'origin', 'loading']
      optionalAttrs.forEach(attr => {
        if (settings[attr]) script.setAttribute(`data-${attr.toLowerCase().replace(/[A-Z]/g, '-$&')}`, settings[attr])
      })
    }
    
    container.appendChild(script)
  }

  reinitialize(): void {
    this.iframe = null
    this.findIframe()
  }

  destroy(): void {
    window.removeEventListener('message', this.handleMessage)
    this.messageHandlers = []
    this.errorHandlers = []
    this.metadataHandlers = []
    this.iframe = null
  }

  constructor() {
    window.addEventListener('message', this.handleMessage)
  }
}

let giscusManager: GiscusManager

if (typeof window !== 'undefined') {
  giscusManager = new GiscusManager()
  ;(window as any).giscusManager = giscusManager
}