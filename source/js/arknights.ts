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
  private readonly canvas: HTMLCanvasElement | undefined
  private readonly ctx: CanvasRenderingContext2D | null | undefined
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
  headerLink: HTMLCollection
  tocLink: HTMLCollection
  postContent: HTMLElement | null
  index: Array<number> = []
  totop: HTMLElement = document.getElementById('to-top')
  scrollID: number = null
  scrolling: number = 0

  private setItem(item: Element) {
    item.classList.add('active')
    let $parent = item.parentElement, brother = $parent.children
    for (let i = 0; i < brother.length; i++) {
      const item = brother.item(i) as HTMLElement
      if (item.classList.contains('toc-child')) {
        item.classList.add('has-active')
        break
      }
    }
    for (let $parent = item.parentElement; $parent.classList[0] != 'toc'; $parent = $parent.parentElement) {
      if ($parent.classList[0] == 'toc-child') {
        $parent.classList.add('has-active')
      }
    }
  }

  private reset() {
    let tocs = document.getElementsByClassName('active')
    let tocTree = document.getElementsByClassName('has-active')
    for (; tocs.length;) {
      const item = tocs.item(0) as HTMLElement
      item.classList.remove('active')
    }
    for (; tocTree.length;) {
      const item = tocTree.item(0) as HTMLElement
      item.classList.remove('has-active')
    }
  }

  private modifyIndex() {
    for (let i = 0; i < this.headerLink.length; i++) {
      const link = this.headerLink.item(i) as HTMLElement
      if (link) {
        this.index.push(link.getBoundingClientRect().top)
      }
    }
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

  private scrolltop() {
    window.scroll({top: 0,left: 0,behavior: 'smooth'});
    document.getElementById('to-top').style.opacity = '0';
    setTimeout(()=> this.totop.style.display = 'none', 300);
  }

  constructor() {
    this.tocLink = document.getElementsByClassName('toc-link')
    if (this.tocLink.length > 0) {
      this.setItem(this.tocLink.item(0))
    }
    document.addEventListener('scroll', ()=>{
      this.tocLink = document.getElementsByClassName('toc-link')
      if (this.tocLink.length > 0) {
        this.headerLink = document.getElementsByClassName('headerlink')
        this.postContent = document.getElementById('post-content')
        const totop = document.getElementById('to-top')
        ++this.scrolling
        if (this.scrollID == null && this.tocLink.length > 0) {
          this.scrollID = setInterval(this.modifyIndex.bind(this), 50)
        }
        setTimeout(()=>{
          if (--this.scrolling == 0) {
            clearInterval(this.scrollID)
            this.scrollID = null
            const totop = document.getElementById('to-top')
            if (this.totop !== null
              && document.getElementById('post-title').getBoundingClientRect().top < -200) {
              totop.style.display = '';
              setTimeout(()=> totop.style.opacity = '1', 300);
            } else {
              totop.style.opacity = '0';
              setTimeout(()=> totop.style.display = 'none', 300);
            }
          }
        }, 200);
      }
    }, {passive: true})
  }
}

class codes {
  private reverse(item: Element, s0: string, s1: string) {
    const block = item.parentElement
    if (block.classList.contains(s0)){
      block.classList.remove(s0)
      block.classList.add(s1)
    } else {
      block.classList.remove(s1)
      block.classList.add(s0)
    }
  }

  private doAsMermaid(item: Element) {
    let Amermaid = item.getElementsByClassName('mermaid').item(0) as HTMLElement
    item.outerHTML = '<div class="highlight mermaid">' + Amermaid.innerText + '</div>'
  }

  private resetName(str: string): string {
    if (str == 'plaintext') return 'TEXT'
    if (str == 'cs') return 'C#'
    return str.toUpperCase()
  }

  private doAsCode(item: Element): void {
    const codeType = item.classList[1], lineCount= item.getElementsByClassName('gutter').item(0).children[0].childElementCount >> 1
    item.classList.add(lineCount < 16 ? 'open' : 'fold')
    item.innerHTML=
    '<span class="code-header"><span class="code-title">\
        <div class="code-icon"></div>' +
        this.resetName(codeType) + ' 共 ' + lineCount + ' 行</span>\
        <span class="code-header-tail">\
          <button class="code-copy"></button>\
          <span class="code-space">展开</span>\
        </span>\
    </span></span>\
    <div class="code-box">' + item.innerHTML + '</div>'
    item.getElementsByClassName('code-copy').item(0).addEventListener('click', (click : MouseEvent)=>{
      const button = click.target as HTMLElement
      navigator.clipboard.writeText(item.getElementsByTagName('code').item(0).innerText)
      button.classList.add('copied')
      setTimeout(()=> button.classList.remove('copied'), 1200)
    })
    item.getElementsByClassName('code-header').item(0).addEventListener('click', (click : MouseEvent)=>{
      if (!(click.target as HTMLElement).classList.contains('code-copy')){
        this.reverse(click.currentTarget as HTMLElement, 'open', 'fold')
      }
    })
  }

  private findCode(): void{
    let codeBlocks = document.getElementsByClassName('highlight')
    for (let i = 0; i < codeBlocks.length; i++) {
      const item = codeBlocks.item(i) as HTMLElement
      if (item.classList.contains('mermaid') || item.getElementsByClassName('code-header').length > 0) {
        continue;
      }
      if (item.getElementsByClassName('mermaid').length > 0) {
        this.doAsMermaid(item)
      } else {
        this.doAsCode(item)
      }
    }
  }

  constructor() {
    this.findCode()
  }
}

class cursors {
  now: MouseEvent
  first: boolean = true
  outer = document.getElementById('cursor-outer').style
  effecter = document.getElementById('cursor-effect').style
  scale: number
  opacity: number = 0
  ishead: boolean = true
  moveEventID: number = null
  fadeEventID: number = null

  private move(): void {
    if (this.now !== undefined) {
      let SX = this.outer.left, SY = this.outer.top
      let preX = Number(SX.substring(0, SX.length - 2)), preY = Number(SY.substring(0, SY.length - 2))
      let nxtX = this.now.x, nxtY = this.now.y
      let delX = (nxtX - preX) / 13, delY = (nxtY - preY) / 13
      let equal = true
      if (Math.abs(delX) >= 0.1) {
        this.outer.left = String(preX + delX) + 'px'
        equal = false
      } else {
        this.outer.left = String(nxtX) + 'px'
      }
      if (Math.abs(delY) >= 0.1) {
        this.outer.top = String(preY + delY) + 'px'
        equal = false
      } else {
        this.outer.top = String(nxtY) + 'px'
      }
      if (equal) {
        clearInterval(this.moveEventID)
        this.moveEventID = null
      }
    }
  }

  private reset(mouse): void {
    if (this.moveEventID === null) {
      this.moveEventID = window.setInterval(this.move.bind(this), 1)
    }
    this.now = mouse
    if (this.first) {
      this.first = false
      this.outer.left = String(this.now.x) + 'px'
      this.outer.top = String(this.now.y) + 'px'
    }
  }

  private fadeOut(): void {
    if (this.opacity > 0) {
      let delta = this.opacity * 0.11
      if (delta < 0.001) {
        delta = this.opacity
      }
      this.effecter.transform = 'translate(-50%, -50%) scale(' + String(this.scale += delta) + ')'
      this.effecter.opacity = String((this.opacity -= delta))
    } else {
      clearInterval(this.fadeEventID)
      this.fadeEventID = null
    }
  }

  private Aeffect(mouse): void {
    if (this.fadeEventID === null) {
      this.fadeEventID = window.setInterval(this.fadeOut.bind(this), 10)
      this.effecter.left = String(mouse.x) + 'px'
      this.effecter.top = String(mouse.y) + 'px'
      this.effecter.transform = 'translate(-50%, -50%) scale(0)'
      this.effecter.opacity = '1'
      this.scale = 0
      this.opacity = 1
    }
  }

  private hold(): void {
    this.outer.height = '24px'
    this.outer.width = '24px'
    this.outer.background = "rgba(255, 255, 255, 0.5)"
  }

  private relax(): void {
    this.outer.height = '36px'
    this.outer.width = '36px'
    this.outer.background = "unset"
  }

  private pushHolder(items: HTMLCollection): void {
    for (let i = 0; i < items.length; i++) {
      const item = items.item(i)
      item.addEventListener('mouseover',()=> this.hold(), {passive: true})
      item.addEventListener('mouseout',()=> this.relax(), {passive: true})
    }
  }

  private pushHolders(): void {
    this.pushHolder(document.getElementsByTagName('a'));
    this.pushHolder(document.getElementsByTagName('input'));
    this.pushHolder(document.getElementsByTagName('button'));
    this.pushHolder(document.getElementsByClassName('code-header'));
    this.pushHolder(document.getElementsByClassName('gt-user-inner'));
    this.pushHolder(document.getElementsByClassName('gt-header-textarea'));
  }

  constructor() {
    document.querySelector('header').addEventListener('mouseenter', ()=> this.ishead = true, {passive: true});
    document.querySelector('header').addEventListener('mouseout', ()=> this.ishead = false, {passive: true});
    window.addEventListener('mousemove', mouse => this.reset(mouse), {passive: true})
    window.addEventListener('click', mouse => this.Aeffect(mouse), {passive: true})
    this.pushHolders()
    const observer = new MutationObserver(this.pushHolders.bind(this));
    observer.observe(document, {childList: true, subtree: true});
  }
}

let index = new indexs()
let code = new codes()
let cursor = new cursors()
new canvasDust('canvas-dust')
