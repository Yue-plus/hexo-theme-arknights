class dust {
  public x: number = 50
  public y: number = 50
  public vx: number = Math.random() * 7
  public vy: number = Math.random() * 14 - 7
  public color: string = '#fff'
  public shadowBlur: number = Math.random() * 3
  public shadowX: number = (Math.random() * 2) -1
  public shadowY: number = (Math.random() * 2) -1
  public radiusX: number = Math.random() * 3
  public radiusY: number = Math.random() * 3
  public rotation: number = Math.PI *  Math.floor(Math.random() *2)
}

class canvasDust {
  private readonly canvas: HTMLCanvasElement | undefined
  private readonly ctx: CanvasRenderingContext2D | null | undefined
  private static dustQuantity: number = 50
  public static dustArr:Array<dust> = []

  constructor(canvasID: string) {
    const canvas: HTMLCanvasElement =
      document.getElementById(canvasID) as HTMLCanvasElement
    if (canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.build()
      window.addEventListener('resize', ()=> this.resize())
    }
  }

  private build() {
    if (this.ctx) {
      const point = canvasDust.getPoint(canvasDust.dustQuantity)
      this.resize()
      for (let i of point) {
        const dustObj = new dust()
        this.buildDust(i[0], i[1], dustObj)
        canvasDust.dustArr.push(dustObj)
      }
      setInterval(()=>{
        this.play()
      }, 80)
    }
  }

  private play() {
    const dustArr = canvasDust.dustArr
    this.ctx?.clearRect(0,0, 2000, 1000)
    for (let dustObj of dustArr) {
      const x = dustObj.x - dustObj.vx
      const y = dustObj.y - dustObj.vy
      this.buildDust(x, y, dustObj)
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

  private resize(): void {
    const canvas = this.canvas
    const width = window.innerWidth
    const height = window.innerHeight
    if (canvas !== undefined) {
      canvas.width = width
      canvas.height = height
    }
    canvasDust.dustQuantity = Math.floor((width + height) / 20)
  }

  private static getPoint(number: number = 1): Array<[number, number]> {
    let point: Array<[number, number]> = []
    for (let i: number=0; i<number; i++) {
      const x: number = Math.floor(Math.random() * window.innerWidth)
      const y: number = Math.floor(Math.random() * window.innerHeight)
      point.push([x, y])
    }
    return point
  }
}

new canvasDust('canvas-dust')
