/// <reference path="base.ts" />

'use strict'

class Pair {
  public comment: HTMLElement
  public button: HTMLElement
  constructor(first: HTMLElement, second: HTMLElement) {
    this.comment = first
    this.button = second
  }
}

class Comments {
  private search: string[] = ["valine", "gitalk", "waline"]
  private elements: Pair[] = []
  private nowActive: Pair

  private changeTo = (item: Pair) => {
    if (item === this.nowActive) {
      return
    }
    this.nowActive.comment.style.display = 'none'
    this.nowActive.button.classList.remove('active')
    item.comment.style.display = ''
    item.button.classList.add('active')
    this.nowActive = item
  }

  private setHTML = () => {
    if (!document.querySelector('#comments')) return
    this.elements = []
    this.search.forEach((item) => {
      try {
        this.elements.push(new Pair(getElement(`#${item}`), getElement(`.${item}-sel`)))
      } catch (e) {}
    })
    this.elements.forEach((item) => item.comment.style.display = 'none')
    this.nowActive = this.elements[0]
    for (let i of this.elements) {
      i.button.addEventListener('click', () => this.changeTo(i))
    }
    this.nowActive.comment.style.display = ''
    this.nowActive.button.classList.add('active')
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:complete', this.setHTML)
    this.nowActive = this.elements[0]
  }
}

new Comments()
