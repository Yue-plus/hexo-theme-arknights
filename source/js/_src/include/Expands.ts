/// <reference path="common/base.ts" />

class expands {
  private find: string[] = [".admonition", ".code"]
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

  private addEvent = (header: HTMLElement) => {
    header.addEventListener('click', (click) => {
      if (click.target === header) {
        this.reverse(header, 'open', 'fold')
      }
    })
    header.addEventListener('keypress', (key) => {
      if (key.key === 'Enter' && key.target === header) {
        this.reverse(header, 'open', 'fold')
      }
    })
  }

  private setHTML = () => {
    this.find.forEach((str) => {
      document.querySelectorAll(str).forEach((item) => { 
        this.addEvent(item.children[0] as HTMLElement)
      })
    })
  }
  constructor() {
    this.setHTML()
    document.addEventListener('pjax:success', this.setHTML)
  }
}

new expands();
