/// <reference path="common/base.ts" />

'use strict'

class Scroll {
  private scrolling: number = 0
  private getingtop: boolean = false
  private height: number = 0
  private visible: boolean = false
  private touchX: number = 0
  private touchY: number = 0x7fffffff
  private notMoveY: boolean = false
  private reallyUp: boolean = false
  private intop: boolean = false
  private totop: HTMLElement

  public scrolltop = () => {
    getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' })
    this.totop.style.opacity = '0'
    this.getingtop = true
    setTimeout(() => this.totop.style.display = 'none', 300)
  }

  private totopChange = (top: number) => {
    if (top < -200) {
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
      getElement('.navBtn').classList.add('hide-btn')
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
      getElement('.navBtn').classList.remove('hide-btn')
      return
    }
    const main = getElement('main').classList
    getElement('.navBtn').classList.remove('hide-btn')
    main.remove('down')
    main.add('up')
    main.add('moving')
    this.intop = true
    setTimeout(() => getElement('main').classList.remove('moving'), 300)
  }

  private setHTML = () => {
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
              navBtn.classList.add('hide-btn')
              this.height = nowheight
            } else if (nowheight > this.height) {
              if (nowheight - this.height > 20) {
                navBtn.classList.remove('hide-btn')
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
            this.totopChange(nowheight)
          }
        } catch (e) {}
      }
      getElement('main').addEventListener('scroll', onScroll)
      this.height = 0
      this.visible = false
      this.totop = getElement('#to-top')
      this.setListener()
    } catch (e) {}
  }

  private checkTouchMove = (event: TouchEvent) => {
    if (Math.abs(event.changedTouches[0].screenX - this.touchX) > 50 &&
      !this.reallyUp) {
      this.notMoveY = true
    }
    if (document.querySelector('.expanded') ||
      window.innerWidth > 1024 ||
      this.notMoveY ||
      event.changedTouches[0].screenY === this.touchY ||
      document.querySelector('.moving')) {
      return
    }
    if (this.intop || getElement('article').getBoundingClientRect().top >= 0) {
      this.reallyUp = true
      if (event.changedTouches[0].screenY > this.touchY) {
        this.slideUp()
      } else {
        this.slideDown()
      }
      this.touchY = event.changedTouches[0].screenY
    }
  }

  private startTouch = (event: TouchEvent) => {
    this.touchX = event.changedTouches[0].screenX
    this.touchY = event.changedTouches[0].screenY
    this.notMoveY = false
  }

  private checkPos = () => {
    if(getElement('article').getBoundingClientRect().top < 0 && this.intop) {
        this.slideDown()
    }
  }

  /**
   * used for `supScroll` and `footNoteScroll` functions
   */
  private setListener = () => {
    getElement('#post-content').addEventListener('click', this.supScroll)
    getElement('#footnotes').addEventListener('click', this.footNoteScroll)
  }

  private supScroll = (event: Event) => {
    const target = event.target as HTMLAnchorElement
    const targetParent = getParent(target)

    if (targetParent?.tagName === 'SUP') {
      event.preventDefault()
      const hash = target.href.split('/').pop()?.slice(1) || ''
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
  }

  private footNoteScroll = (event: Event) => {
    const target = event.target as HTMLAnchorElement
    if (target.tagName === 'A') {
      event.preventDefault()
      const hash = target.href.split('/').pop()?.slice(1) || ''
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  constructor() {
    document.addEventListener('pjax:success', this.setHTML)
    document.addEventListener('touchstart', this.startTouch)
    document.addEventListener('touchmove', this.checkTouchMove)
    document.addEventListener('touchend', this.checkPos)
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
    this.setHTML()
    this.totop = document.querySelector('#to-top') as HTMLElement
  }
}

var scrolls = new Scroll()
