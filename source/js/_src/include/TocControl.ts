/// <reference path="common/base.ts" />

'use strict'

class TocControl {
  private inToc = (mouse: MouseEvent) => {
    const indexBtn = getElement('#to-index')
    const toc = getElement('#toc-div')
    if (!isParent(toc, mouse.target) && !isParent(indexBtn, mouse.target)) {
        this.change()
        document.removeEventListener('mousedown', this.inToc)
      }
  }

  private ifClick = () => {
    document.addEventListener('mouseup', this.inToc)
  }

  public change = () => {
    const indexBtn = getElement('#to-index')
    const toc = getElement('#toc-div')
    if (toc.className === 'open') {
      toc.className = ''
      indexBtn.classList.remove('open')
      document.removeEventListener('mousedown', this.ifClick)
      document.removeEventListener('mouseup', this.inToc)
    } else {
      toc.className = 'open'
      indexBtn.classList.add('open')
      document.addEventListener('mousedown', this.ifClick)
    }
  }
}

var tocControl = new TocControl()