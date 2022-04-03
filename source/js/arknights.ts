"use strict"

function getElement(string : string, item : Element = document.documentElement): HTMLElement {
  let tmp : HTMLElement | null = item.querySelector(string)
  if (tmp === null) {
    throw new Error("Unknow HTML")
  }
  return tmp
}

function getParent(item : Element): HTMLElement {
  let tmp : HTMLElement | null = item.parentElement
  if (tmp === null) {
    throw new Error("Unknow HTML")
  }
  return tmp
}

class dust {
  public x: number = 50
  public y: number = 50
  public vx: number = Math.random() * 2 + 2
  public vy: number = Math.random() * 2
  public color: string = '#fff'
  public shadowBlur: number = Math.random() * 3
  public shadowX: number = (Math.random() * 2) -1
  public shadowY: number = (Math.random() * 2) -1
  public radiusX: number = Math.random() * 3
  public radiusY: number = Math.random() * 3
  public rotation: number = Math.PI *  Math.floor(Math.random() * 2)
}

class canvasDust {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D | null
  public width: number = 300
  public height: number = 300
  private dustQuantity: number = 50
  public dustArr:Array<dust> = []

  constructor(canvasID: string) {
    const canvas: HTMLCanvasElement =
      document.getElementById(canvasID) as HTMLCanvasElement
    if (canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.build()
      window.addEventListener('resize', ()=> this.resize())
    } else {
      throw new Error('canvasID 无效')
    }
  }

  private build() {
    this.resize()
    if (this.ctx) {
      const point = canvasDust.getPoint(this.dustQuantity)
      for (let i of point) {
        const dustObj = new dust()
        this.buildDust(i[0], i[1], dustObj)
        this.dustArr.push(dustObj)
      }
      setInterval(()=>{
        this.play()
      }, 40)
    }
  }

  private play() {
    const dustArr = this.dustArr
    this.ctx?.clearRect(0,0, this.width, this.height)
    for (let i of dustArr) {
      if (i.x < 0 || i.y < 0) {
        const x: number = this.width
        const y: number = Math.floor(Math.random() * window.innerHeight)
        i.x = x
        i.y = y
        this.buildDust(x, y, i)
      } else {
        const x = i.x - i.vx
        const y = i.y - i.vy
        this.buildDust(x, y, i)
      }
    }
  }

  private buildDust(x: number, y: number, dust: dust) {
    const ctx = this.ctx
    if (x) dust.x = x
    if (y) dust.y = y
    if (ctx) {
      ctx.beginPath()
      ctx.shadowBlur = dust.shadowBlur
      ctx.shadowColor = dust.color
      ctx.shadowOffsetX = dust.shadowX
      ctx.shadowOffsetY = dust.shadowY
      ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle=dust.color
      ctx.fill()
    }
  }

  private resize() {
    const canvas = this.canvas
    const width = window.innerWidth
    const height = window.innerHeight
    this.width = width
    this.height = height
    this.dustQuantity = Math.floor((width + height) / 38)
    if (canvas !== undefined) {
      canvas.width = width
      canvas.height = height
    }
  }

  private static getPoint(number: number = 1): Array<[number, number]> {
    let point: Array<[number, number]> = []
    for (let i: number = 0; i<number; i++) {
      const x: number = Math.floor(Math.random() * window.innerWidth)
      const y: number = Math.floor(Math.random() * window.innerHeight)
      point.push([x, y])
    }
    return point
  }
}

class indexs {
  private headerLink: NodeList
  private tocLink: NodeList
  private index: Array<number> = []
  private scrollID: number = 0
  private scrolling: number = 0
  private readonly totop: HTMLElement = getElement('#to-top')

  private setItem(item: HTMLElement) {
    item.classList.add('active')
    let $parent = getParent(item), brother = $parent.children
    for (let i = 0; i < brother.length; i++) {
      const item = brother.item(i) as HTMLElement
      if (item.classList.contains('toc-child')) {
        item.classList.add('has-active')
        break
      }
    }
    for (let $parent = getParent(item); $parent.classList[0] != 'toc'; $parent = getParent($parent)) {
      if ($parent.classList[0] == 'toc-child') {
        $parent.classList.add('has-active')
      }
    }
  }

  private reset() {
    let tocs = document.querySelectorAll('#toc-div .active')
    let tocTree = document.querySelectorAll('#toc-div .has-active')
    tocs.forEach((item)=>{
      item.classList.remove('active')
    })
    tocTree.forEach((item)=>{
      item.classList.remove('has-active')
    })
  }

  private modifyIndex() {
    this.headerLink.forEach((item)=>{
      this.index.push((item as HTMLElement).getBoundingClientRect().top)
    })
    this.reset()
    for (let i = 0; i < this.tocLink.length; ++i) {
      const item = this.tocLink.item(i) as HTMLElement
      if (i + 1 == this.index.length || (this.index[i + 1] > 150 && (this.index[i] <= 150 || i == 0))) {
        this.setItem(item)
        break
      }
    }
    this.index = []
  }

  private scrolltop(): void {
    window.scroll({top: 0,left: 0,behavior: 'smooth'});
    this.totop.style.opacity = '0'
    setTimeout(()=> this.totop.style.display = 'none', 300)
  }

  constructor() {
    this.headerLink = document.querySelectorAll('.headerlink')
    this.tocLink = document.querySelectorAll('.toc-link')
    if (this.tocLink.length > 0) {
      this.setItem(this.tocLink.item(0) as HTMLElement)
    }
    document.addEventListener('scroll', ()=>{
      this.headerLink = document.querySelectorAll('.headerlink')
      this.tocLink = document.querySelectorAll('.toc-link')
      if (this.tocLink.length > 0) {
        ++this.scrolling
        if (this.scrollID == 0 && this.tocLink.length > 0) {
          this.scrollID = setInterval(this.modifyIndex.bind(this), 50) as unknown as number
        }
        setTimeout(()=>{
          if (--this.scrolling == 0) {
            clearInterval(this.scrollID)
            this.scrollID = 0
            if (this.totop !== null) {
                if(getElement('#post-title').getBoundingClientRect().top < -200) {
                this.totop.style.display = ''
                setTimeout(()=> this.totop.style.opacity = '1', 300)
              } else {
                this.totop.style.opacity = '0'
                setTimeout(()=> this.totop.style.display = 'none', 300)
              }
            }
          }
        }, 200);
      }
    }, {passive: true})
  }
}

class codes {
  private reverse(item: Element, s0: string, s1: string) {
    const block = getParent(item)
    if (block.classList.contains(s0)){
      block.classList.remove(s0)
      block.classList.add(s1)
    } else {
      block.classList.remove(s1)
      block.classList.add(s0)
    }
  }

  private doAsMermaid(item: Element) {
    let Amermaid = item.querySelector('.mermaid') as HTMLElement
    item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>'
  }

  private resetName(str: string): string {
    if (str == 'plaintext') {
      return 'TEXT'
    }
    if (str == 'cs') {
      return 'C#'
    }
    return str.toUpperCase()
  }

  private doAsCode(item: Element): void {
    const codeType = this.resetName(item.classList[1]),
          lineCount = getElement('.gutter', item).children[0].childElementCount >> 1
    item.classList.add(lineCount < 16 ? 'open' : 'fold')
    item.innerHTML=
      '<span class="code-header">\
        <span class="code-title">\
          <div class="code-icon"></div>' +
          this.resetName(codeType) + ' 共 ' + lineCount + ' 行</span>\
          <span class="code-header-tail">\
            <button class="code-copy"></button>\
            <span class="code-space">展开</span></span></span></span>\
      <div class="code-box">'
        + item.innerHTML + '</div>'
    getElement('.code-copy', item).addEventListener('click', (click : Event)=>{
      const button = click.target as HTMLElement
      navigator.clipboard.writeText(getElement('code', item).innerText)
      button.classList.add('copied')
      setTimeout(()=> button.classList.remove('copied'), 1200)
    })
    getElement('.code-header', item).addEventListener('click', (click : Event)=>{
      if (!(click.target as HTMLElement).classList.contains('code-copy')){
        this.reverse(click.currentTarget as HTMLElement, 'open', 'fold')
      }
    })
  }

  private doAsAdmon(item: Element): void {
    item.classList.add('AD-fold')
    const header = item.children[0]
    header.innerHTML= '<div class="admon-icon"></div>' + header.innerHTML
    getElement('.admonition-title', item).addEventListener('click', (click : Event)=>{
      this.reverse(click.currentTarget as HTMLElement, 'AD-open', 'AD-fold')
    })
  }

  private findCode(): void{
    let codeBlocks = document.querySelectorAll('.highlight')
    if (codeBlocks !== null) {
      codeBlocks.forEach((item)=>{
        if (!item.classList.contains('mermaid') && item.querySelector('.code-header') === null) {
          if (item.querySelector('.mermaid') !== null) {
            this.doAsMermaid(item)
          } else {
            this.doAsCode(item)
          }
        }
      })
    }
    codeBlocks = document.querySelectorAll('.admonition')
    if (codeBlocks !== null) {
      codeBlocks.forEach((item)=>this.doAsAdmon(item))
    }
  }

  constructor() {}
}

class cursors {
  private now: MouseEvent = new MouseEvent('')
  private first: boolean = true
  private last: number = 0
  private moveIng: boolean = false
  private fadeIng: boolean = false
  private readonly outer : CSSStyleDeclaration = getElement('#cursor-outer').style
  private readonly effecter : CSSStyleDeclaration = getElement('#cursor-effect').style
  private readonly attention: string =
    "a,input,button,.admonition,.code-header,.gt-user-inner,.gt-header-textarea,.navBtnIcon"

  private move(timestamp: number): void {
    if (this.now !== undefined) {
      let SX = this.outer.left, SY = this.outer.top
      let preX = Number(SX.substring(0, SX.length - 2)),
          preY = Number(SY.substring(0, SY.length - 2))
      let delX = (this.now.x - preX) * 0.3, delY = (this.now.y - preY) * 0.3
      if(timestamp - this.last > 15) {
        preX += delX
        preY += delY
        this.outer.left = preX.toFixed(2) + 'px'
        this.outer.top = preY.toFixed(2) + 'px'
        this.last = timestamp
      }
      if (Math.abs(delX) > 0.2 || Math.abs(delY) > 0.2) {
        window.requestAnimationFrame(this.move.bind(this))
      } else {
        this.moveIng = false
      }
    }
  }

  private reset(mouse: MouseEvent): void {
    if (!this.moveIng) {
      this.moveIng = true
      window.requestAnimationFrame(this.move.bind(this))
    }
    this.now = mouse
    if (this.first) {
      this.first = false
      this.outer.left = String(this.now.x) + 'px'
      this.outer.top = String(this.now.y) + 'px'
    }
  }

  private Aeffect(mouse: MouseEvent): void {
    if (this.fadeIng == false) {
      this.fadeIng = true
      this.effecter.left = String(mouse.x) + 'px'
      this.effecter.top = String(mouse.y) + 'px'
      this.effecter.transition =
        'transform .5s cubic-bezier(0.22, 0.61, 0.21, 1)\
        ,opacity .5s cubic-bezier(0.22, 0.61, 0.21, 1)'
      this.effecter.transform = 'translate(-50%, -50%) scale(1)'
      this.effecter.opacity = '0'
      setTimeout(()=>{
        this.fadeIng = false
        this.effecter.transition = ''
        this.effecter.transform = 'translate(-50%, -50%) scale(0)'
        this.effecter.opacity = '1'
      }, 500)
    }
  }

  private hold(): void {
    this.outer.height = '24px'
    this.outer.width = '24px'
    this.outer.background = "rgba(255, 255, 255, 0.5)"
  }

  public relax(): void {
    this.outer.height = '36px'
    this.outer.width = '36px'
    this.outer.background = "unset"
  }

  private pushHolder(items: NodeList): void {
    items.forEach((item)=>{
      if (!(item as HTMLElement).classList.contains('is--active')) {
        item.addEventListener('mouseover',()=> this.hold(), {passive: true})
        item.addEventListener('mouseout',()=> this.relax(), {passive: true})
      }
    })
  }

  private pushHolders(): void {
    this.pushHolder(document.querySelectorAll(this.attention))
  }

  constructor() {
    this.effecter.transform = 'translate(-50%, -50%) scale(0)'
    this.effecter.opacity = '1'
    window.addEventListener('mousemove', mouse => this.reset(mouse), {passive: true})
    window.addEventListener('click', mouse => this.Aeffect(mouse), {passive: true})
    this.pushHolders()
    const observer = new MutationObserver(this.pushHolders.bind(this))
    observer.observe(document, {childList: true, subtree: true})
  }
}

class slides {
  private readonly nav: HTMLElement = getElement('nav')
  private readonly button: HTMLElement = getElement('.navBtnIcon')
  closeSearch: boolean = false

  private relabel(): void {
    let navs = this.nav.querySelectorAll('.navItem'),
        mayLen : number = 0,
        may : Element = navs.item(0)
    navs.forEach((item)=>{
      let now = item as HTMLElement,
          link = now.querySelector('a') as HTMLAnchorElement
      if (link !== null) {
        let href = link.href
        now.classList.remove('active')
        if (href.length > mayLen && document.URL.match(href) !== null) {
          mayLen = href.length
          may = now
        }
        if (href.match('archives') !== null
          &&(document.URL.match('tag') !== null
            || document.URL.match('categories') !== null)){
          may = now
          mayLen = Infinity
        }
      }
    })
    if (may !== null) {
      may.classList.add('active')
    }
  }

  constructor() {
    this.relabel()
    document.addEventListener('pjax:success', this.relabel.bind(this))
    this.button.addEventListener('mousedown',()=>{
      if (document.querySelector('.search')) {
        this.closeSearch = true
      }
    })
    this.button.onclick = ()=>{
      if (this.nav === null) {
        throw new Error("Unknow HTML")
      }
      if (this.closeSearch) {
        this.closeSearch = false
      } else if (this.nav.classList[0] === 'expanded') {
        this.nav.classList.remove('expanded')
      } else {
        this.nav.classList.add('expanded')
      }
    }
  }
}

let cursor = new cursors()
try {
  var index = new indexs()
} catch(e) {}
try {
  new slides()
} catch(e) {}
let code = new codes()
try {
  new canvasDust('canvas-dust')
} catch(e) {}

class pjaxSupport {
  private readonly canvas : HTMLCanvasElement = document.createElement('canvas')
  private readonly line : CanvasRenderingContext2D
  private width : number = 0
  private finalWidth : number = 0
  private last : number = 0
  private playing : number = 0

  private setwidth(timestamp : number) {
    if (timestamp - this.last > 10) {
      this.last = timestamp
      let all = window.innerWidth
      this.width += Math.min(all * 0.02, this.finalWidth)
      this.line.fillStyle = "#fe2"
      this.line.fillRect(0, 0, this.width, 1)
      this.line.fillRect(all - this.width, 0, all, 1)
    }
    if (this.width < this.finalWidth) {
      window.requestAnimationFrame(this.setwidth.bind(this))
    } else {
      if (!--this.playing && this.finalWidth == window.innerWidth * 0.5) {
        this.width = 0
        this.finalWidth = 0
        setTimeout(()=>{
          document.body.removeChild(document.body.firstChild as HTMLElement)
          this.line.clearRect(0, 0, window.innerWidth, 2)
        }, 200)
      }
    }
  }

  private start(need : number) {
    ++this.playing
    this.finalWidth = need
    window.requestAnimationFrame(this.setwidth.bind(this))
  }

  constructor() {
    let tmp = this.canvas.getContext('2d')
    if (tmp === null) {
      throw new Error('Unknown HTML')
    }
    this.line = tmp
    this.canvas.height = 1
    this.canvas.style.top = '0'
    this.canvas.style.position = "fixed"
    document.addEventListener('pjax:send',()=>{
      this.canvas.width = window.innerWidth
      document.body.insertBefore(this.canvas,document.body.firstChild)
      this.start(window.innerWidth * 0.05)
      setTimeout(()=>{
        if (this.finalWidth < window.innerWidth * 0.3) {
          this.start(window.innerWidth * 0.3)
        }
      }, 500)
    })
    document.addEventListener('pjax:complete',()=>{
      cursor.relax()
      this.start(window.innerWidth * 0.5)
    })
  }
}

new pjaxSupport()
