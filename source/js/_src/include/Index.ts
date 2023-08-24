/// <reference path="common/base.ts" />

'use strict'

class Index {
  private lastIndex: number = -1
  private headerLink: NodeList = document.querySelectorAll('null')
  private tocLink: NodeList = document.querySelectorAll('null')

  private setItem = (item: HTMLElement) => {
    item.classList.add('active')
    let parent = getParent(item), brother = parent.children
    for (let i = 0, length = brother.length; i < length; ++i) {
      const item = brother.item(i) as HTMLElement
      if (item.classList.contains('toc-child')) {
        item.classList.add('has-active')
        break
      }
    }
    for (; parent.classList[0] !== 'toc'; parent = getParent(parent)) {
      if (parent.classList[0] === 'toc-child') {
        parent.classList.add('has-active')
      }
    }
  }

  private reset = (not: HTMLElement) => {
    let tocs: NodeList = document.querySelectorAll('#toc-div .active')
    let tocTree: NodeList = document.querySelectorAll('#toc-div .has-active')
    tocs.forEach(item => {
      if (!item.contains(not)) {
        (item as HTMLElement).classList.remove('active')
      }
    })
    tocTree.forEach(item => {
      if (!(item.parentElement as HTMLElement).contains(not)) {
        (item as HTMLElement).classList.remove('has-active')
      }
    })
  }

  private check = (index: Array<number>, id: number) => {
    return index[id + 1] > window.innerHeight / 3 || index[id] > 0
  }

  private modifyIndex = () => {
    let index: Array<number> = []
    this.headerLink.forEach(item => {
      index.push((item as HTMLElement).getBoundingClientRect().top)
    })
    if (this.lastIndex >= 0 &&
      (this.lastIndex < 1 || !this.check(index, this.lastIndex - 1)) &&
      this.check(index, this.lastIndex)) {
      return
    }
    for (let i = 0; i < this.tocLink.length; ++i) {
      const item = this.tocLink.item(i) as HTMLElement
      if (i + 1 === index.length || this.check(index, i)) {
        this.lastIndex = i
        this.setItem(item)
        this.reset(item)
        return
      }
    }
    this.lastIndex = 0
    this.setItem(this.tocLink.item(0) as HTMLElement)
    this.reset(this.tocLink.item(0) as HTMLElement)
  }

  private setHTML = () => {
    try {
      this.headerLink = getElement('#post-content').querySelectorAll('h1,h2,h3,h4,h5,h6')
      this.tocLink = document.querySelectorAll('.toc-link')
      if (this.tocLink.length) {
        this.setItem(this.tocLink.item(0) as HTMLElement)
      }
    } catch {}
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:success', this.setHTML)
    window.addEventListener('hexo-blog-decrypt', this.setHTML)
    getElement('main').addEventListener('scroll', () => {
      if (this.tocLink.length) {
        this.modifyIndex()
      }
    }, { passive: true })
  }
}

let indexs = new Index()
