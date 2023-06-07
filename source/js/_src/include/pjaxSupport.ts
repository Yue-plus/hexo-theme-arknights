/// <reference path="common/base.ts" />

'use strict'

class pjaxSupport {
  private readonly loading: HTMLElement = getElement('.loading')
  private readonly left: HTMLElement = getElement('.loadingBar.left')
  private readonly right: HTMLElement = getElement('.loadingBar.right')
  private timestamp: number = 0

  private start = (need: number) => {
    this.left.style.transform = `scaleX(${need})`
    this.right.style.transform = `scaleX(${need})`
    ++this.timestamp
  }

  private loaded = () => {
    getElement('main').scrollTop = 0
    this.start(1)
    setTimeout((time: number) => {
      if (this.timestamp === time) {
        this.loading.style.opacity = '0'
      }
    }, 600, this.timestamp)
  }

  private fail = () => {
    setTimeout((time: number) => {
      if (this.timestamp !== time) {
        return;
      }
      this.start(0)
      this.loading.classList.add('fail')
      setTimeout((time: number) => {
        if (this.timestamp === time) {
          this.loading.style.opacity = '0'
          this.loading.classList.remove('fail')
        }
      }, 600, this.timestamp)
    }, 600, this.timestamp)
  }

  constructor() {
    document.addEventListener('pjax:send', () => {
      if (getElement('main').classList.contains('up')) {
        scrolls.slideDown()
      }
      this.loading.classList.add('reset')
      this.loading.classList.remove('fail')
      this.start(0)
      setTimeout((time: number) => {
        if (this.timestamp !== time) {
          return;
        }
        this.loading.classList.remove('reset')
        this.start(0.3)
        this.loading.style.opacity = '1'
        setTimeout((time: number) => {
          if (this.timestamp === time) {
            this.start(0.6)
          }
        }, 1200, this.timestamp)
      }, 0, this.timestamp)
    })
    document.addEventListener('pjax:start', this.loaded)
    document.addEventListener('pjax:error', this.fail)
  }
}

try {
  new pjaxSupport()
} catch (e) {}
