/// <reference path="base.ts" />

'use strict'

class dust {
  public x: number = 50
  public y: number = 50
  public vx: number = Math.random() * 2 + 2
  public vy: number = Math.random() * 2
  public color: string = '#fff'
  public shadowBlur: number = Math.random() * 3
  public shadowX: number = (Math.random() * 2) - 1
  public shadowY: number = (Math.random() * 2) - 1
  public radiusX: number = Math.random() * 3
  public radiusY: number = Math.random() * 3
  public rotation: number = Math.PI * Math.floor(Math.random() * 2)
}

class canvasDust {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D | null
  public width: number = 300
  public height: number = 300
  private dustQuantity: number = 50
  public dustArr: Array<dust> = []

  constructor(canvasID: string) {
    const canvas: HTMLCanvasElement = getElement(canvasID) as HTMLCanvasElement
    if (canvas) {
      this.canvas = canvas
      this.ctx = canvas.getContext('2d')
      this.build()
      window.addEventListener('resize', () => this.resize())
    } else {
      throw new Error('canvasID 无效')
    }
  }

  private build = () => {
    this.resize()
    if (this.ctx) {
      const point = canvasDust.getPoint(this.dustQuantity)
      for (let i of point) {
        const dustObj = new dust()
        this.buildDust(i[0], i[1], dustObj)
        this.dustArr.push(dustObj)
      }
      setInterval(this.play, 40)
    }
  }

  private play = () => {
    const dustArr = this.dustArr
    this.ctx?.clearRect(0, 0, this.width, this.height)
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

  private buildDust = (x: number, y: number, dust: dust) => {
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
      ctx.fillStyle = dust.color
      ctx.fill()
    }
  }

  private resize = () => {
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

  private static getPoint = (number: number = 1): Array<[number, number]> => {
    let point: Array<[number, number]> = []
    for (let i: number = 0; i < number; ++i) {
      const x: number = Math.floor(Math.random() * window.innerWidth)
      const y: number = Math.floor(Math.random() * window.innerHeight)
      point.push([x, y])
    }
    return point
  }
}

try {
  new canvasDust('#canvas-dust')
} catch (e) {}
