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
    
    // 如果有 Giscus，重新初始化管理器
    this.initializeGiscus()
  }

  /**
   * 初始化 Giscus 管理器
   */
  private initializeGiscus = () => {
    try {
      const giscusContainer = document.querySelector('#giscus')
      if (giscusContainer && typeof giscusManager !== 'undefined') {
        // 延迟重新初始化，确保 Giscus 脚本已加载
        setTimeout(() => {
          giscusManager.reinitialize()
        }, 1000)
      }
    } catch (e) {
      // 静默处理，Giscus 可能未启用
    }
  }

  constructor() {
    this.setHTML()
    document.addEventListener('pjax:complete', this.setHTML)
  }
}

new Comments()
