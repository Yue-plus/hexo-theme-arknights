/// <reference path="common/base.ts" />

class expands {
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
      if ((click.target as HTMLElement).tagName !== 'BUTTON' &&
        (click.target as HTMLElement).tagName !== 'A') {
        this.reverse(header, 'open', 'fold')
      }
    })
    header.addEventListener('keypress', (key) => {
      if (key.key === 'Enter') {
        this.reverse(header, 'open', 'fold')
      }
    })
  }

  public setHTML = () => {
    document.querySelectorAll('.expand-box').forEach((item) => { 
      this.addEvent(item.children[0] as HTMLElement)
    })
  }
  constructor() {}
}

let expand = new expands();
