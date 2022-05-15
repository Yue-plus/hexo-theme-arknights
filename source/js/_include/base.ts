'use strict'

function getElement(string: string, item: Element = document.documentElement): HTMLElement {
  let tmp: HTMLElement | null = item.querySelector(string)
  if (tmp === null) {
    throw new Error("Unknow HTML")
  }
  return tmp
}

function getParent(item: Element): HTMLElement {
  let tmp: HTMLElement | null = item.parentElement
  if (tmp === null) {
    throw new Error("Unknow HTML")
  }
  return tmp
}
