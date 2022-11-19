/// <reference path="base.ts" />

'use strict'

class Scroll {
  private scrolling: number = 0
  private getingtop: boolean = false
  private height: number = 0
  private visible: boolean = false
  private touchX: number = 0
  private touchY: number = 0x7fffffff
  private mayNotUp: boolean = false
  private reallyUp: boolean = false
  private intop: boolean = false
  private totop: HTMLElement
  private startTop: boolean = false

  public scrolltop = () => {
    getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' })
    this.totop.style.opacity = '0'
    this.getingtop = true
    setTimeout(() => this.totop.style.display = 'none', 300)
  }

  private totopChange = (post: HTMLElement) => {
    if (post.getBoundingClientRect().top < -200) {
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

  public slideDown = () => {
    if (!this.intop) {
      return
    }
    const main = getElement('main').classList
    if (!document.querySelector('.expanded')) {
      getElement('.navBtn').classList.add('hide')
    }
    main.remove('up')
    main.add('down')
    main.add('down')
    main.add('moving')
    setTimeout(() => {
      main.remove('down')
      main.remove('moving')
    }, 300)
    this.intop = false
  }

  public slideUp = () => {
    if (this.intop || document.querySelector('.moving')) {
      return
    }
    if (!document.querySelector('#search-header')) {
      getElement('.navBtn').classList.remove('hide')
      return
    }
    const main = getElement('main').classList
    getElement('.navBtn').classList.remove('hide')
    main.remove('down')
    main.add('up')
    main.add('moving')
    this.intop = true
    setTimeout(() => getElement('main').classList.remove('moving'), 300)
  }

  private setHtml = () => {
    try {
      let navBtn: HTMLElement = getElement('.navBtn')
      let onScroll = () => {
        try {
          let nowheight: number = getElement('article').getBoundingClientRect().top
          if (nowheight > 0) {
            return
          }
          if (!document.querySelector('.expanded')) {
            if (this.height - nowheight > 100) {
              navBtn.classList.add('hide')
              this.height = nowheight
            } else if (nowheight > this.height) {
              if (nowheight - this.height > 20) {
                navBtn.classList.remove('hide')
              }
              this.height = nowheight
            }
          }
          ++this.scrolling
          setTimeout(() => {
            if (!--this.scrolling) {
              this.getingtop = false
            }
          }, 100)
          if (!this.getingtop) {
            this.totopChange(getElement('#post-title'))
          }
        } catch (e) {}
      }
      getElement('main').addEventListener('scroll', onScroll)
      this.height = 0
      this.visible = false
      this.totop = getElement('#to-top')
    } catch (e) {}
  }

  private checkTouchMove = (event: TouchEvent) => {
    if (Math.abs(event.changedTouches[0].clientX - this.touchX) > 50 && !this.reallyUp) {
      this.mayNotUp = true
    }
    if (document.querySelector('.expanded') ||
      window.innerWidth > 1024 ||
      this.mayNotUp ||
      event.changedTouches[0].clientY == this.touchY) {
      return
    }
    if (this.startTop || getElement('article').getBoundingClientRect().top >= 0) {
      this.reallyUp = true
      if (event.changedTouches[0].clientY > this.touchY) {
        this.slideUp()
      } else {
        this.slideDown()
      }
      this.touchY = event.changedTouches[0].clientY
    }
  }

  private startTouch = (event: TouchEvent) => {
    this.touchX = event.changedTouches[0].clientX
    this.touchY = event.changedTouches[0].clientY
    this.mayNotUp = false
    this.startTop = getElement('article').getBoundingClientRect().top >= 0
  }

  constructor() {
    document.addEventListener('pjax:success', this.setHtml)
    document.addEventListener('touchstart', this.startTouch)
    document.addEventListener('touchmove', this.checkTouchMove)
    document.addEventListener('wheel', (event: WheelEvent) => {
      if (document.querySelector('.expanded') || window.innerWidth > 1024) {
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
    this.setHtml()
    this.totop = document.querySelector('#to-top') as HTMLElement
  }
}

var scrolls = new Scroll()
