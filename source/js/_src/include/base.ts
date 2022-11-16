'use strict'

function getElement(string: string, item: Element = document.documentElement): HTMLElement {
  let tmp: HTMLElement | null = item.querySelector(string)
  if (tmp === null) {
    throw new Error("Unknown HTML")
  }
  return tmp
}

function getParent(item: Element, level: number = 1): HTMLElement {
  for (; level--;) {
    let tmp: HTMLElement | null = item.parentElement
    if (tmp === null) {
      throw new Error("Unknown HTML")
    }
    item = tmp;
  }
  return item as HTMLElement
}
