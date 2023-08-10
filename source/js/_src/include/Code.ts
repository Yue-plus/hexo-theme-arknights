/// <reference path="common/base.ts" />
/// <reference path="Expands.ts" />

'use strict'

class Code {
  private doAsMermaid = (item: Element) => {
    let Amermaid = item.querySelector('.mermaid') as HTMLElement
    item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>'
  }

  private resetName = (str: string): string => {
    if (str == 'plaintext') {
      return 'TEXT'
    }
    if (str == 'cs') {
      return 'C#'
    }
    if (str == 'cpp') {
      return 'C++'
    }
    return str.toUpperCase()
  }

  private doAsCode = (item: Element) => {
    const codeType = this.resetName(item.classList[1]),
      lineCount = getElement('.gutter', item).children[0].childElementCount >> 1
    item.classList.add(lineCount < 16 ? 'open' : 'fold')
    item.classList.add('expand-box')
    item.innerHTML =
      `<div class="ex-header" tabindex='0'>
        <i class="i-status"></i>
        <span class="ex-title">${format(config.code.codeInfo, codeType, lineCount)}</span>
      </div>
      <div class="ex-content">${item.innerHTML}
        <button class="code-copy"></button>
      </div>`
    getElement('.code-copy', item).addEventListener('click', (click: Event) => {
      const button = click.target as HTMLElement
      navigator.clipboard.writeText(getElement('code', item).innerText)
      button.classList.add('copied')
      setTimeout(() => {
        button.classList.remove('copied')
      }, 1200)
    })
  }

  private clearMermaid = () => {
    document.querySelectorAll('.mermaid').forEach((item) => {
      let style = item.querySelector('style')
      if (style) {
        style.remove()
      }
    })
  }

  public findCode = () => {
    let codeBlocks = document.querySelectorAll('.highlight')
    if (codeBlocks !== null) {
      codeBlocks.forEach(item => {
        if (item.getAttribute('code-find') === null) {
          try {
            if (!item.classList.contains('mermaid') && item.querySelector('.code-header') === null) {
              if (item.querySelector('.mermaid') !== null) {
                this.doAsMermaid(item)
              } else {
                this.doAsCode(item)
              }
            }
          } catch (e) {
            return
          }
          item.setAttribute('code-find', '')
        }
      })
    }
    if(typeof(mermaid) !== 'undefined') {
      mermaid.init()
      this.clearMermaid()
    }
    expand.setHTML()
  }

  constructor() {
    this.findCode()
    document.addEventListener('pjax:success', this.findCode)
  }
}

let code = new Code()
