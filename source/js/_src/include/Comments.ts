/// <reference path="common/base.ts" />
/// <reference path="common/selectors.ts" />
/// <reference path="GiscusManager.ts" />

'use strict'

class Comments {
  private search: string[] = ["valine", "gitalk", "waline", "artalk", "utterances", "giscus"]
  private elements: Pair[] = []

  private async validateGiscusOrigin(): Promise<boolean> {
    return typeof giscusManager !== 'undefined' ? await giscusManager.validateOrigin() : true
  }

  private async loadGiscus(): Promise<void> {
    const container = document.querySelector('#giscus')
    if (!container) return

    const isOriginValid = await this.validateGiscusOrigin()
    if (!isOriginValid) return

    if (typeof giscusManager !== 'undefined') {
      giscusManager.loadGiscusScript()
    }
  }

  private setHTML = async () => {
    const commentsContainer = document.querySelector('#comments')
    if (!commentsContainer) return
    
    const selectorContainer = commentsContainer.querySelector('.selector')
    if (selectorContainer) {
      this.elements = []
      this.search.forEach((item) => {
        try {
          this.elements.push(new Pair(getElement(`#${item}`), getElement(`.${item}-sel`)))
        } catch (e) {}
      })
      new Selectors(this.elements, 0)
    }
    
    await this.loadGiscus()
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:complete', this.setHTML)
  }
}

new Comments()
