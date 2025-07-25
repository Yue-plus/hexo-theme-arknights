/// <reference path="common/base.ts" />
/// <reference path="canvaDust.ts" />

'use strict'

function sendGiscusMessage<T>(message: T) {
  const iframe = document.getElementsByClassName("giscus-frame");
  if (iframe.length > 1) {
    console.warn("There are multiple giscus frames.");
  }
  for (let i = 0; i < iframe.length; i++) {
    const target = iframe[i];
    if (target instanceof HTMLIFrameElement) {
      target.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app');
    } else {
      console.warn("Target is not an iframe element.");
    }
  }
}

class ColorMode {
  private html: HTMLElement = document.documentElement
  private dark: boolean = this.html.getAttribute('theme-mode') === 'dark'
  private inChanging: boolean = false
  private btn: HTMLElement = getElement('#color-mode')

  public change = () => {
    this.inChanging = true
    let background = document.createElement('div')
    background.style.transition = '1.5s'
    background.innerHTML =
      `<div style='background: var(--${this.dark ? 'dark' : 'light'}-background);
        height: 100vh; width: 100vw;
        position: fixed; left: 0; top: 0; z-index: -99999;
        background-attachment: fixed;
        background-position: 50% 0;
        background-repeat: no-repeat;
        background-size: cover;'></div>`
    document.body.insertBefore(background, document.body.firstChild)
    this.btn.style.pointerEvents = 'none'
    setTimeout(() => {
      if (canvasDusts) canvasDusts.stop()
      if (this.dark) {
        this.html.setAttribute('theme-mode', 'light')
        sendGiscusMessage({ setConfig: { theme: 'light_high_contrast' } });
        this.dark = false
        window.localStorage['theme-mode'] = 'light'
      } else {
        this.html.setAttribute('theme-mode', 'dark')
        sendGiscusMessage({ setConfig: { theme: 'dark_high_contrast' } });
        this.dark = true
        window.localStorage['theme-mode'] = 'dark'
      }
      background.style.opacity = '0'
      code.resetMermaid()
    })
    setTimeout(() => {
      document.body.removeChild(background)
      if (canvasDusts) canvasDusts.play()
    }, 1500)
    setTimeout(() => {
      this.btn.style.pointerEvents = ''
      this.inChanging = false
    }, 1000)
  }

  constructor() {
    document.addEventListener('keypress', (ev: KeyboardEvent) => {
      if (this.inChanging) {
        return
      }
      if (ev.key === 'c' && ev.target &&
        !['INPUT', 'TEXTAREA'].includes((ev.target as HTMLElement).tagName)) {
        this.change()
      }
    })
  }
}

try {
  var colorMode = new ColorMode()
} catch (e) { }
