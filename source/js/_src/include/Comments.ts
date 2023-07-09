/// <reference path="common/base.ts" />
/// <reference path="common/selectors.ts" />

'use strict'

class Comments {
  private search: string[] = ["valine", "gitalk", "waline"]
  private elements: Pair[] = []

  private setHTML = () => {
    if (!document.querySelector('#comments .selector')) return
    this.elements = []
    this.search.forEach((item) => {
      try {
        this.elements.push(new Pair(getElement(`#${item}`), getElement(`.${item}-sel`)))
      } catch (e) {}
    })
    new Selectors(this.elements, 0)
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:complete', this.setHTML)
  }
}

new Comments()
