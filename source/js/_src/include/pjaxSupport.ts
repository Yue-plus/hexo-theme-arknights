/// <reference path="base.ts" />

'use strict'

class pjaxSupport {
  private readonly loading: HTMLElement = getElement('.loading')
  private readonly left: HTMLElement = getElement('.loadingBar.left')
  private readonly right: HTMLElement = getElement('.loadingBar.right')
  private timestamp: number = 0

  private start = (need: number) => {
    this.left.style.width = need + '%'
    this.right.style.width = need + '%'
    ++this.timestamp
  }

  private loaded = () => {
    ++this.timestamp
    if (this.loading.style.opacity === '1') {
      getElement('main').scrollTop = 0
      if (this.left.style.width !== "50%") {
        this.start(50)
        setTimeout((time: number) => {
          if (this.timestamp == time) {
            this.loading.style.opacity = '0'
          }
        }, 600, this.timestamp)
      }
    }
  }

  constructor() {
    document.addEventListener('pjax:send', () => {
      if (getElement('main').classList.contains('up')) {
        scrolls.slideDown()
      }
      this.loading.classList.add('reset')
      this.start(0)
      setTimeout((time: number) => {
        if (this.timestamp == time) {
          this.loading.style.opacity = '1'
          this.loading.classList.remove('reset')
          this.start(15)
          setTimeout((time: number) => {
            if (this.timestamp == time) {
              this.start(30)
            }
          }, 800, this.timestamp)
        }
      }, 10, this.timestamp)
    })
    document.addEventListener('pjax:start', this.loaded)
    document.addEventListener('pjax:complete', this.loaded)
  }
}

try {
  new pjaxSupport()
} catch (e) {}
