/// <reference path="base.ts" />

'use strict'

class Header {
  private readonly header: HTMLElement = getElement('header');
  private readonly button: HTMLElement = getElement('.navBtnIcon');
  private closeSearch: boolean = false;

  private relabel = () => {
    let navs = this.header.querySelectorAll('.navItem'),
      mayLen: number = 0,
      may: Element = navs.item(0)
    getElement('.navBtn').classList.remove('hide')
    navs.forEach(item => {
      if (item.classList.contains('search-header')) {
        return
      }
      let now = item as HTMLElement,
        link = getElement('a', now) as HTMLAnchorElement
      if (link !== null) {
        let href = link.href, match = now.getAttribute('matchdata')
        now.classList.remove('active')
        if (href.length > mayLen && document.URL.match(href) !== null) {
          mayLen = href.length;
          may = now;
        }
        if (match) {
          const s = match.split(',');
          s.forEach(item => {
            if (document.URL.match(item) !== null) {
              may = now;
              mayLen = Infinity;
            }
          })
        }
      }
    })
    if (may !== null) {
      may.classList.add('active');
    }
  }

  public open = () => {
    scrolls.slideDown()
    this.header.classList.add('expanded')
    this.header.classList.add('moving')
    this.header.classList.remove('closed')
    setTimeout(() => this.header.classList.remove('moving'), 300)
  }

  public close = () => {
    this.header.classList.add('closed')
    this.header.classList.add('moving')
    this.header.classList.remove('expanded')
    setTimeout(() => this.header.classList.remove('moving'), 300)
  }

  public reverse = () => {
    if (this.closeSearch) {
      this.closeSearch = false;
    } else if (this.header.classList[0] === 'expanded') {
      this.close()
    } else {
      this.open()
    }
  }

  constructor() {
    this.relabel();
    document.addEventListener('pjax:success', this.relabel)
    this.button.addEventListener('mousedown', () => {
      if (document.querySelector('.search')) {
        this.closeSearch = true
      }
    })
    this.button.onclick = this.reverse
  }
}

var header = new Header()
