/// <reference path="base.ts" />

'use strict'

class Code {
  private reverse = (item: Element, s0: string, s1: string) => {
    const block = getParent(item)
    if (block.classList.contains(s0)) {
      block.classList.remove(s0)
      block.classList.add(s1)
    } else {
      block.classList.remove(s1)
      block.classList.add(s0)
    }
  }

  private doAsCode = (item: Element) => {
    getElement('.code-copy', item).addEventListener('click', (click: Event) => {
      const button = click.target as HTMLElement
      navigator.clipboard.writeText(getElement('code', item).innerText)
      button.classList.add('copied')
      setTimeout(() => button.classList.remove('copied'), 1200)
    })
    getElement('.code-header', item).addEventListener('click', (click: Event) => {
      if (!(click.target as HTMLElement).classList.contains('code-copy')) {
        this.reverse(click.currentTarget as HTMLElement, 'open', 'fold')
      }
    })
  }

  public findCode = () => {
    let codeBlocks = document.querySelectorAll('.highlight')
    if (codeBlocks !== null) {
      codeBlocks.forEach(item => {
        if (item.getAttribute('code-find') === null) {
          this.doAsCode(item)
          item.setAttribute('code-find','')
        }
      })
    }
  }

  constructor() {
    this.findCode()
  }
}

let code = new Code()
