declare var config: {
  root: string
  code_fold: number
  search: {
    preload: string
    activeHolder: string
    blurHolder: string
    noResult: string
  }
  code: {
    copy: string
    codeInfo: string
  }
}

declare var mermaid: {
  run: Function
  init: Function
  initialize: Function
} | undefined
