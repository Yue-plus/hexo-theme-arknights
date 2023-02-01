/// <reference path="base.ts" />

'use strict'

class ColorMode {
  private html: HTMLElement = document.documentElement
  private dark: boolean = this.html.getAttribute('theme-mode') === 'dark'
  private inChanging: boolean = false
  constructor() {
    document.addEventListener('keypress', (ev: KeyboardEvent) => {
      if (this.inChanging) {
        return
      }
      if (ev.key === 'c') {
        this.inChanging = true
        let background = document.createElement('div')
        background.style.transition = '1.5s'
        background.innerHTML =
          `<div style='background: var(--${this.dark ? 'dark' : 'light'}-background);
            height: 100vh; width: 100vw;
            position: fixed; left: 0; top: 0; z-index: -99999;'></div>`
        document.body.insertBefore(background, document.body.firstChild)
        setTimeout(() => {
          if (this.dark) {
            this.html.setAttribute('theme-mode', 'light')
            this.dark = false
          } else {
            this.html.setAttribute('theme-mode', 'dark')
            this.dark = true
          }
          background.style.opacity = '0'
        })
        setTimeout(() => document.body.removeChild(background), 1500)
        setTimeout(() => this.inChanging = false, 1000)
      }
    })
  }
}

var colorMode = new ColorMode()
