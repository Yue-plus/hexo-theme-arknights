/// <reference path="base.ts" />

'use strict'

class Cursor {
  private now: MouseEvent = new MouseEvent('')
  private first: boolean = true
  private last: number = 0
  private moveIng: boolean = false
  private fadeIng: boolean = false
  private readonly outer: CSSStyleDeclaration
  private readonly effecter: CSSStyleDeclaration
  private readonly attention: string =
    "a,input,button,textarea,.code-header,.gt-user-inner,.navBtnIcon"

  private move = (timestamp: number) => {
    if (this.now !== undefined) {
      let SX = this.outer.left, SY = this.outer.top,
        preX = Number(SX.substring(0, SX.length - 2)),
        preY = Number(SY.substring(0, SY.length - 2)),
        delX = (this.now.x - preX) * 0.3, delY = (this.now.y - preY) * 0.3
      if (timestamp - this.last > 15) {
        preX += delX
        preY += delY
        this.outer.left = preX.toFixed(2) + 'px'
        this.outer.top = preY.toFixed(2) + 'px'
        this.last = timestamp
      }
      if (Math.abs(delX) > 0.2 || Math.abs(delY) > 0.2) {
        window.requestAnimationFrame(this.move)
      } else {
        this.moveIng = false
      }
    }
  }

  private reset = (mouse: MouseEvent) => {
    if (!this.moveIng) {
      this.moveIng = true
      window.requestAnimationFrame(this.move)
    }
    this.now = mouse
    if (this.first) {
      this.first = false
      this.outer.left = String(this.now.x) + 'px'
      this.outer.top = String(this.now.y) + 'px'
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
    this.outer.background = "rgba(255, 255, 255, 0.5)"
  }

  public relax = () => {
    this.outer.height = '36px'
    this.outer.width = '36px'
    this.outer.background = "unset"
  }

  private pushHolder = (items: NodeList) => {
    items.forEach(item => {
      if (!(item as HTMLElement).classList.contains('is--active')) {
        item.addEventListener('mouseover', this.hold, { passive: true })
        item.addEventListener('mouseout', this.relax, { passive: true })
      }
    })
  }

  private pushHolders = () => {
    this.pushHolder(document.querySelectorAll(this.attention))
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
    this.pushHolders()
    const observer = new MutationObserver(this.pushHolders)
    observer.observe(document, { childList: true, subtree: true })
  }
}
window.onload = () => new Cursor()
