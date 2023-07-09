/// <reference path="common/base.ts" />

'use strict'

class dust {
  public x: number
  public y: number
  public vx: number = Math.random() * 1 + 1
  public vy: number = Math.random() * 1 + 0.01
  public shadowBlur: number = Math.random() * 3
  public shadowX: number = (Math.random() * 2) - 1
  public shadowY: number = (Math.random() * 2) - 1
  public radiusX: number = Math.random() * 1.5 + 0.5
  public radiusY: number = this.radiusX * (Math.random() * (1.3 - 0.3) + 0.3)
  public rotation: number = Math.PI * Math.floor(Math.random() * 2)
  constructor(x: number = 50, y: number = 50) {
    this.x = x
    this.y = y
  }
}

class canvasDust {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  public color: string = '#fff'
  public width: number = 300
  public height: number = 300
  private dustQuantity: number = 50
  public dustArr: Array<dust> = []
  private inStop: boolean = false

  constructor(canvasID: string) {
    const canvas: HTMLCanvasElement = getElement(canvasID) as HTMLCanvasElement
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.build()
    window.addEventListener('resize', this.resize)
  }

  private build = () => {
    this.resize()
    if (this.ctx) {
      const point = canvasDust.getPoint(this.dustQuantity)
      for (let i of point) {
        const dustObj = new dust(i[0], i[1])
        this.buildDust(dustObj)
        this.dustArr.push(dustObj)
      }
      requestAnimationFrame(this.paint)
    }
  }

  private paint = () => {
    if (this.inStop) {
      return
    }
    const dustArr = this.dustArr
    for (let i of dustArr) {
      this.ctx.clearRect(i.x - 6, i.y - 6, 12, 12)
      if (i.x < -5 || i.y < -5) {
        const x: number = this.width
        const y: number = Math.floor(Math.random() * window.innerHeight)
        i.x = x
        i.y = y
      } else {
        i.x -= i.vx
        i.y -= i.vy
      }
    }
    for (let i of dustArr) {
      this.buildDust(i)
    }
    requestAnimationFrame(this.paint)
  }

  private buildDust = (dust: dust) => {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.shadowBlur = dust.shadowBlur
    ctx.shadowOffsetX = dust.shadowX
    ctx.shadowOffsetY = dust.shadowY
    ctx.ellipse(dust.x, dust.y, dust.radiusX, dust.radiusY, dust.rotation, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }

  private resize = () => {
    const canvas = this.canvas
    const width = window.innerWidth
    const height = window.innerHeight
    this.width = width
    this.height = height
    this.dustQuantity = Math.floor((width + height) / 38)
    canvas.width = width
    canvas.height = height
    this.ctx.shadowColor = 
      this.ctx.fillStyle = this.color
  }

  private static getPoint = (number: number = 1): Array<[number, number]> => {
    let point: Array<[number, number]> = []
    for (let i: number = 0; i < number; ++i) {
      const x: number = Math.floor(Math.random() * window.innerWidth)
      const y: number = Math.floor(Math.random() * window.innerHeight)
      point.push([x, y])
    }
    return point
  }

  public stop = () => {
    this.inStop = true
  }
  public play = () => {
    if (this.inStop === true) {
      this.inStop = false
      requestAnimationFrame(this.paint)
    }
  }
}

try {
  var canvasDusts = new canvasDust('#canvas-dust')
} catch (e) {}
