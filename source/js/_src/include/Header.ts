/// <reference path="common/base.ts" />

'use strict'

class Header {
  private readonly header: HTMLElement = getElement('header')
  private readonly button: HTMLElement = getElement('.navBtnIcon')
  private closeSearch: boolean = false
  private readyRev: boolean = true

  private relabel = () => {
    let navs = this.header.querySelectorAll('.navItem'),
      mayLen = 0, may = navs.item(0)
    navs.forEach(item => {
      try { 
        let now = item as HTMLElement,
          link = getElement('a', now) as HTMLAnchorElement
        if (link !== null) {
          let href = link.href, match = now.getAttribute('matchdata')
          now.classList.remove('active')
          if (getParent(link) != now) {
            return
          }
          if (href.length > mayLen && document.URL.match(href) !== null) {
            mayLen = href.length
            may = now
          }
          if (match) {
            const s = match.split(',')
            s.forEach(item => {
              if (document.URL.match(item) !== null) {
                may = now
                mayLen = Infinity
              }
            })
          }
        }
      } catch (e) {}
    })
    if (may !== null) {
      do {
        if (may.classList.contains('navItem')) {
          may.classList.add('active')
        }
      } while (!(may = getParent(may)).classList.contains('navContent'))
    }
  }

  public inHeader = (mouse: MouseEvent) => {
    let range = this.header.getBoundingClientRect()
    if (mouse.clientX < range.x || mouse.clientY < range.y ||
      mouse.clientX > range.right || mouse.clientY > range.bottom){
      this.close()
    }
  }

  public open = (item: Element = this.header) => {
    item.classList.add('expanded')
    item.classList.remove('closed')
    scrolls.slideDown()
    if (item === this.header) {
      item.classList.add('moving')
      setTimeout(() => item.classList.remove('moving'), 300)
    }
    document.addEventListener('click', this.inHeader)
  }

  public close = (item: Element = this.header) => {
    document.removeEventListener('click', this.inHeader)
    item.classList.add('closed')
    item.classList.remove('expanded')
    if (item === this.header) {
      item.classList.add('moving')
      setTimeout(() => item.classList.remove('moving'), 300)
      this.closeAll()
      getElement('nav', item).classList.remove('moved');
    }
  }

  public reverse = (item: Element = this.header) => {
    if (this.closeSearch) {
      this.closeSearch = false
      return
    }
    if (!this.readyRev) {
      return
    }
    this.readyRev = false
    if (item.classList.contains('expanded')) {
      this.close(item)
    } else {
      this.open(item)
    }
    setTimeout(() => this.readyRev = true, 300)
  }

  public closeAll = () => {
    this.header.querySelectorAll('.expanded').forEach((item) =>
      item.classList.remove('expanded'))
  }

  constructor() {
    this.relabel()
    document.addEventListener('pjax:success', this.relabel)
    document.addEventListener('pjax:send', () => this.close())
    this.button.addEventListener('mousedown', () => {
      if (document.querySelector('.search')) {
        this.closeSearch = true
      }
    })
    this.button.onclick = () => this.reverse(this.header)
    document.querySelectorAll('.navItemList').forEach((item) => {
      item = getParent(item)
      item.addEventListener('click', (event) => {
        if (getParent(event.target as Element) === item) {
          this.reverse(item)
        }
      })
    })
  }
}

var header = new Header()
