/// <reference path="base.ts" />

'use strict'

class Scroll {
  private scrolling: number = 0
  private getingtop: boolean = false
  private height: number = 0
  private visible: boolean = false
  private touchY: number = 0
  private moved: boolean = false
  private intop: boolean = false
  private totop: HTMLElement

  public scrolltop = () => {
    getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.totop.style.opacity = '0'
    this.getingtop = true
    setTimeout(() => this.totop.style.display = 'none', 300)
  }

  private totopChange = () => {
    if (getElement('#post-title').getBoundingClientRect().top < -200) {
      this.totop.style.display = ''
      this.visible = true
      setTimeout(() => {
        if (this.visible) {
          this.totop.style.opacity = '1'
        }
      }, 300)
    } else {
      this.totop.style.opacity = '0'
      this.visible = false
      setTimeout(() => {
        if (!this.visible) {
          this.totop.style.display = 'none'
        }
      }, 300)
    }
  }

  private slideDown = () => {
    getElement('.navBtn').classList.add('hide')
    const main = getElement('main').classList
    main.remove('up')
    main.add('down')
    setTimeout(() => main.remove('down'), 300)
    this.intop = false
  }

  private onScroll = (navBtn: HTMLElement) => {
    const nowheight: number = getElement('article').getBoundingClientRect().top
    if (this.height >= nowheight && this.intop) {
      this.slideDown()
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
      this.totopChange()
    }
  }

  private slideUp = () => {
    getElement('.navBtn').classList.remove('hide')
    getElement('main').classList.add('up')
    this.intop = true
  }

  private setHtml = () => {
    try {
      let navBtn: HTMLElement = getElement('.navBtn')
      this.totop = getElement('#to-top')
      this.height = 0
      this.visible = false
      getElement('main').addEventListener('scroll', () => this.onScroll(navBtn)
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
        if (!this.moved || document.querySelector('.expanded')) {
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
        if (document.querySelector('.expanded')) {
          return
        }
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
    this.totop = getElement('#to-top')
  }
}

try {
  var scrolls = new Scroll()
} catch (e) {}
