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

  private doAsAdmon = (item: Element) => {
    item.classList.add('AD-fold')
    const header = item.children[0]
    header.innerHTML = `<div class="admon-icon"></div>${header.innerHTML}`
    getElement('.admonition-title', item).addEventListener('click', (click: Event) => {
      this.reverse(click.currentTarget as HTMLElement, 'AD-open', 'AD-fold')
    })
  }

  public findCode = () => {
    let codeBlocks = document.querySelectorAll('.highlight')
    if (codeBlocks !== null) {
      codeBlocks.forEach(item => this.doAsCode(item))
    }
    codeBlocks = document.querySelectorAll('.admonition')
    if (codeBlocks !== null) {
      codeBlocks.forEach(item => this.doAsAdmon(item))
    }
  }

  constructor() {}
}

let code = new Code()
