/// <reference path="common/base.ts" />

'use strict'

class Cursor {
  private now: MouseEvent = new MouseEvent('')
  private first: boolean = true
  private last: number = 0
  private moveIng: boolean = false
  private fadeIng: boolean = false
  private nowX: number = 0
  private nowY: number = 0
  private readonly outer: CSSStyleDeclaration
  private readonly effecter: CSSStyleDeclaration
  private readonly attention: string =
    `a,input,button,textarea,
    .navBtnIcon,
    #post-content img,
    .ex-header,
    .gt-user-inner,
    .wl-sort>li,
    #valine .vicon,#valine .vat,
    .lg-container img,.clickable`

  private set = (X: number = this.nowX, Y: number = this.nowY) => {
    this.outer.transform =
      `translate(calc(${X.toFixed(2)}px - 50%),
                  calc(${Y.toFixed(2)}px - 50%))`
  }

  private move = (timestamp: number) => {
    if (this.now !== undefined) {
      let delX = this.now.x - this.nowX,
        delY = this.now.y - this.nowY
      this.nowX += delX * Math.min(0.025 * (timestamp - this.last), 1)
      this.nowY += delY * Math.min(0.025 * (timestamp - this.last), 1)
      this.set()
      this.last = timestamp
      if (Math.abs(delX) > 0.1 || Math.abs(delY) > 0.1) {
        window.requestAnimationFrame(this.move)
      } else {
        this.set(this.now.x, this.now.y)
        this.moveIng = false
      }
    }
  }

  private reset = (mouse: MouseEvent) => {
    this.outer.top = '0'
    this.outer.left = '0'
    if (!this.moveIng) {
      this.moveIng = true
      window.requestAnimationFrame(this.move)
    }
    this.now = mouse
    if (this.first) {
      this.first = false
      this.nowX = this.now.x
      this.nowY = this.now.y
      this.set()
    }
  }

  private Aeffect = (mouse: MouseEvent) => {
    if (this.fadeIng == false) {
      this.fadeIng = true
      this.effecter.left = String(mouse.x) + 'px'
      this.effecter.top = String(mouse.y) + 'px'
      this.effecter.transition =
        'transform .5s cubic-bezier(0.22, 0.61, 0.21, 1)\
        ,opacity .5s cubic-bezier(0.22, 0.61, 0.21, 1)'
      this.effecter.transform = 'translate(-50%, -50%) scale(1)'
      this.effecter.opacity = '0'
      setTimeout(() => {
        this.fadeIng = false
        this.effecter.transition = ''
        this.effecter.transform = 'translate(-50%, -50%) scale(0)'
        this.effecter.opacity = '1'
      }, 500)
    }
  }

  private hold = () => {
    this.outer.height = '24px'
    this.outer.width = '24px'
    this.outer.background = "var(--theme-cursor-bg)"
  }

  public relax = () => {
    this.outer.height = '36px'
    this.outer.width = '36px'
    this.outer.background = "unset"
  }

  private pushHolder = () => {
    document.querySelectorAll(this.attention).forEach(item => {
      if (!(item as HTMLElement).classList.contains('is--active')) {
        item.addEventListener('mouseover', this.hold, { passive: true })
        item.addEventListener('mouseout', this.relax, { passive: true })
      }
    })
  }

  constructor() {
    let node: HTMLElement = document.createElement('div')
    node.id = 'cursor-container'
    node.innerHTML = `<div id="cursor-outer"></div><div id="cursor-effect"></div>`
    document.body.appendChild(node)
    this.outer = getElement('#cursor-outer', node).style
    this.outer.top = '-100%'
    this.effecter = getElement('#cursor-effect', node).style
    this.effecter.transform = 'translate(-50%, -50%) scale(0)'
    this.effecter.opacity = '1'
    window.addEventListener('mousemove', this.reset, { passive: true })
    window.addEventListener('click', this.Aeffect, { passive: true })
    this.pushHolder()
    const observer = new MutationObserver(this.pushHolder)
    observer.observe(document, { childList: true, subtree: true })
  }
}
new Cursor();
