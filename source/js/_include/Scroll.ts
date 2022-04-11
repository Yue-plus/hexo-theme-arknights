/// <reference path="base.ts" />

'use strict'

class Scroll {
  private scrolling: number = 0
  private getingtop: boolean = false
  private height: number = 0
  private visible: boolean = false
  private touchY: number = 0
  private moved: boolean = false

  public scrolltop = () => {
    let totop: HTMLElement = getElement('#to-top')
    getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' });
    totop.style.opacity = '0'
    this.getingtop = true
    setTimeout(() => totop.style.display = 'none', 300)
  }

  private totopChange = (totop: HTMLElement) => {
    if (getElement('#post-title').getBoundingClientRect().top < -200) {
      totop.style.display = ''
      this.visible = true
      setTimeout(() => {
        if (this.visible) {
          totop.style.opacity = '1'
        }
      }, 300)
    } else {
      totop.style.opacity = '0'
      this.visible = false
      setTimeout(() => {
        if (!this.visible) {
          totop.style.display = 'none'
        }
      }, 300)
    }
  }

  private slideDown = () => {
    getElement('.navBtn').classList.add('hide')
    getElement('main').classList.remove('up')
  }

  private onScroll = (totop: HTMLElement, navBtn: HTMLElement) => {
    const nowheight: number = getElement('article').getBoundingClientRect().top
    if (this.height > nowheight) {
      navBtn.classList.add('hide')
    }
    if (this.height - nowheight > 100) {
      navBtn.classList.add('hide')
      this.height = nowheight
    } else if (nowheight > this.height) {
      if (nowheight - this.height > 20) {
        navBtn.classList.remove('hide')
      }
      this.height = nowheight
    }
    ++this.scrolling
    setTimeout(() => {
      if (!--this.scrolling) {
        this.getingtop = false
      }
    }, 100)
    if (!this.getingtop) {
      this.totopChange(totop)
    }
  }

  private slideUp = () => {
    getElement('.navBtn').classList.remove('hide')
    getElement('main').classList.add('up')
  }

  private setHtml = () => {
    try {
      let totop: HTMLElement = getElement('#to-top'),
        navBtn: HTMLElement = getElement('.navBtn')
      this.height = 0
      this.visible = false
      getElement('main').addEventListener('scroll', () => this.onScroll(totop, navBtn)
        , { passive: true })
    } catch (e) {}
  }

  constructor() {
    document.addEventListener('pjax:success', this.setHtml)
    if (document.querySelector('.search-header')) {
      document.addEventListener('touchstart', (event: TouchEvent) => {
        this.touchY = event.changedTouches[0].screenY
      })
      document.addEventListener('touchmove', () => {
        this.moved = true
      })
      document.addEventListener('touchend', (event: TouchEvent) => {
        if (!this.moved) {
          return
        }
        this.moved = false
        if (getElement('article').getBoundingClientRect().top >= 0) {
          if (event.changedTouches[0].screenY > this.touchY) {
            this.slideUp()
          } else {
            this.slideDown()
          }
        }
      })
      document.addEventListener('wheel', (event: WheelEvent) => {
        if (getElement('article').getBoundingClientRect().top >= 0) {
          if (event.deltaY < 0) {
            this.slideUp()
          } else {
            this.slideDown()
          }
        }
      })
    }
    this.setHtml()
  }
}

var scrolls = new Scroll()
