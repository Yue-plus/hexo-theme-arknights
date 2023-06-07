/// <reference path="enviroment.d.ts" />

'use strict'

function getElement(string: string, item: Element = document.documentElement): HTMLElement {
  let tmp: HTMLElement | null = item.querySelector(string)
  if (tmp === null) {
    throw new Error("Unknown HTML")
  }
  return tmp
}

function getParent(item: Element, level: number = 1): HTMLElement {
  while (level--) {
    let tmp: HTMLElement | null = item.parentElement
    if (tmp === null) {
      throw new Error("Unknown HTML")
    }
    item = tmp
  }
  return item as HTMLElement
}

function format(format: string, ...args: any[]): string {
  return format.replaceAll(/\$\*?[0-9]*/g, (match) => {
    if (match === '$*') {
      return ''
    }
    let Index = match.slice(1) as unknown as number;
    if (Index >= args.length) {
      return ''
    }
    return args[Index]
  })
}
