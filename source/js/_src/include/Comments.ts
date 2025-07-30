/// <reference path="common/base.ts" />
/// <reference path="common/selectors.ts" />
/// <reference path="GiscusManager.ts" />

'use strict'

class Comments {
  private search: string[] = ["valine", "gitalk", "waline", "artalk", "utterances", "giscus"]
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
    
    if (document.querySelector('#giscus') && typeof giscusManager !== 'undefined') {
      giscusManager.reinitialize()
    }
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:complete', this.setHTML)
  }
}

new Comments()
