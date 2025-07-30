/// <reference path="common/base.ts" />

'use strict'

class GiscusManager {
  private iframe: HTMLIFrameElement | null = null

  private findIframe(): void {
    this.iframe = document.querySelector('iframe.giscus-frame')
  }

  public syncTheme(theme?: string): boolean {
    this.findIframe()
    
    if (!this.iframe || !this.iframe.contentWindow) return false

    const currentTheme = theme || document.documentElement.getAttribute('theme-mode')
    const giscusTheme = currentTheme === 'dark' ? 'dark' : 
                       currentTheme === 'light' ? 'light' : 
                       'preferred_color_scheme'

    try {
      this.iframe.contentWindow.postMessage({
        giscus: { setConfig: { theme: giscusTheme } }
      }, 'https://giscus.app')
      return true
    } catch (error) {
      return false
    }
  }

  public isLoaded(): boolean {
    this.findIframe()
    return !!this.iframe
  }

  public reinitialize(): void {
    this.iframe = null
    this.findIframe()
  }
}

let giscusManager: GiscusManager

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    giscusManager = new GiscusManager()
    ;(window as any).giscusManager = giscusManager
  })
}