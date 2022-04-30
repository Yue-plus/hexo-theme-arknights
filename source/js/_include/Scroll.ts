/// <reference path="base.ts" />

'use strict'

class Scroll {
  private scrolling: number = 0
  private getingtop: boolean = false
  private height: number = 0
  private visible: boolean = false
  private touchY: number = 0
  private intop: boolean = false
  private totop: HTMLElement
  private startTop: boolean = false

  public scrolltop = () => {
    getElement('main').scroll({ top: 0, left: 0, behavior: 'smooth' });
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
    const main = getElement('main').classList
    main.remove('up')
    main.add('down')
    getElement('main').classList.add('moving')
    setTimeout(() => {
      main.remove('down')
      getElement('main').classList.remove('moving')
    }, 300)
    this.intop = false
  }

  public slideUp = () => {
    getElement('.navBtn').classList.remove('hide')
    getElement('main').classList.add('up')
    getElement('main').classList.add('moving')
    this.intop = true
    setTimeout(() => getElement('main').classList.remove('moving'), 300)
  }

  private setHtml = () => {
    try {
      let navBtn: HTMLElement = getElement('.navBtn')
      let onScroll = () => {
        try {
          let nowheight: number = getElement('article').getBoundingClientRect().top,
            post: HTMLElement = getElement('#post-title')
          if (this.height >= nowheight && this.intop) {
            this.slideDown()
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
            this.totopChange(post)
          }
        } catch (e) {}
      }
      this.totop = getElement('#to-top')
      this.height = 0
      this.visible = false
      getElement('main').addEventListener('scroll', onScroll)
    } catch (e) {}
  }

  constructor() {
    document.addEventListener('pjax:success', this.setHtml)
    if (document.querySelector('.search-header')) {
      document.addEventListener('touchstart', (event: TouchEvent) => {
        this.touchY = event.changedTouches[0].screenY
        this.startTop = getElement('article').getBoundingClientRect().top >= 0
      })
      document.addEventListener('touchmove', (event: TouchEvent) => {
        if (document.querySelector('.expanded') || window.innerWidth > 1024) {
          return
        }
        if (this.startTop || getElement('article').getBoundingClientRect().top >= 0) {
          if (event.changedTouches[0].screenY > this.touchY) {
            this.slideUp()
          } else {
            this.slideDown()
          }
          this.touchY = event.changedTouches[0].screenY
        }
      })
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
    }
    this.setHtml()
    this.totop = document.querySelector('#to-top') as HTMLElement
  }
}

var scrolls = new Scroll()
