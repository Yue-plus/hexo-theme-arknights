class dust {
  private readonly canvas: HTMLCanvasElement | undefined
  private readonly ctx: CanvasRenderingContext2D | null
  private dustQuantity: number = Math.floor((window.innerWidth + window.innerHeight) / 20)
  private dust : Array<[number, number]>

  constructor(canvasID: string) {
    const canvas: HTMLCanvasElement =
      document.getElementById(canvasID) as HTMLCanvasElement
    if (canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.dust = dust.getPoint(this.dustQuantity)
      this.build()
      window.addEventListener('resize', ()=> this.resize())
    } else {
      throw new Error('canvasID 无效')
    }
  }

  private build(): void {
    // const point = dust.getPoint(this.dustQuantity)
    // this.resize()
    // for (let i of point) {
    //   this.dust(i[0], i[1])
    // }
    // for (let i of point) {
    //
    // }
    // setTimeout(this.build(), 3)
  }

  private resize(): boolean {
    if (!(!this.canvas || !this.ctx)) {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
      return true
    } else {
      return false
    }
  }

  private dust(x: number, y: number) {
    const ctx: CanvasRenderingContext2D | null = this.ctx
    const color: string = '#fff'
    const shadowBlur: number = Math.random() * 3
    const shadowX: number = (Math.random() * 2) -1
    const shadowY: number = (Math.random() * 2) -1
    const radiusX: number = Math.random() * 3
    const radiusY: number = Math.random() * 3
    const rotation: number = Math.PI *  Math.floor(Math.random() *2)
    if (ctx) {
      ctx.beginPath()
      ctx.shadowBlur = shadowBlur
      ctx.shadowColor = color
      ctx.shadowOffsetX = shadowX
      ctx.shadowOffsetY = shadowY
      ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2)
      ctx.closePath()
      ctx.fillStyle=color
      ctx.fill()
    }
  }

  private static getPoint(number: number = 1): Array<[number, number]> {
    let point: Array<[number, number]> = []
    for (let i: number=1; i<number; i++) {
      const x: number = Math.floor(Math.random() * window.innerWidth)
      const y: number = Math.floor(Math.random() * window.innerHeight)
      point.push([x, y])
    }
    return point
  }
}

new dust('canvas-dust')
