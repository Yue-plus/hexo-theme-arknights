declare var config: {
  root: string
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
  initialize: Function
} | undefined
