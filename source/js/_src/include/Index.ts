/// <reference path="base.ts" />

'use strict'

class Index {
  private setItem = (item: HTMLElement) => {
    item.classList.add('active')
    let parent = getParent(item), brother = parent.children
    for (let i = 0; i < brother.length; ++i) {
      const item = brother.item(i) as HTMLElement
      if (item.classList.contains('toc-child')) {
        item.classList.add('has-active')
        break
      }
    }
    for (; parent.classList[0] != 'toc'; parent = getParent(parent)) {
      if (parent.classList[0] == 'toc-child') {
        parent.classList.add('has-active')
      }
    }
  }

  private reset = () => {
    let tocs: NodeList = document.querySelectorAll('#toc-div .active')
    let tocTree: NodeList = document.querySelectorAll('#toc-div .has-active')
    tocs.forEach(item => {
      (item as HTMLElement).classList.remove('active')
    })
    tocTree.forEach(item => {
      (item as HTMLElement).classList.remove('has-active')
    })
  }

  private modifyIndex = (headerLink: NodeList, tocLink: NodeList) => {
    let index: Array<number> = []
    headerLink.forEach(item => {
      index.push((item as HTMLElement).getBoundingClientRect().top)
    })
    this.reset()
    for (let i = 0; i < tocLink.length; ++i) {
      const item = tocLink.item(i) as HTMLElement
      if (i + 1 == index.length || (index[i + 1] > 150 && (index[i] <= 150 || i == 0))) {
        this.setItem(item)
        break
      }
    }
  }

  private setHtml = () => {
    let headerLink: NodeList = document.querySelectorAll('h2,h3,h4,h5,h6'),
      tocLink: NodeList = document.querySelectorAll('.toc-link')
    if (tocLink.length !== 0) {
      this.setItem(tocLink.item(0) as HTMLElement)
    }
    getElement('main').addEventListener('scroll', () => {
      if (tocLink.length === 0) return
      this.modifyIndex(headerLink, tocLink)
    }, { passive: true })
  }

  constructor() {
    document.addEventListener('pjax:success', this.setHtml)
    this.setHtml()
  }
}

new Index()
