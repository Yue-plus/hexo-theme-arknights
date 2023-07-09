class Pair {
  public comment: HTMLElement
  public button: HTMLElement
  constructor(first: HTMLElement, second: HTMLElement) {
    this.comment = first
    this.button = second
  }
}

class Selectors {
  private elements: Pair[] = []
  private nowActive: Pair

  private changeTo = (item: Pair) => {
    if (item === this.nowActive) {
      return
    }
    this.nowActive.comment.style.display = 'none'
    this.nowActive.button.classList.remove('active')
    item.comment.style.display = ''
    item.button.classList.add('active')
    this.nowActive = item
  }

  constructor(elements: Pair[] = [], active: number = 0) {
    this.elements = elements
    this.nowActive = this.elements[active]
    this.elements.forEach((item) => item.comment.style.display = 'none')
    this.nowActive = this.elements[0]
    for (let i of this.elements) {
      i.button.addEventListener('click', () => this.changeTo(i))
    }
    this.nowActive.comment.style.display = ''
    this.nowActive.button.classList.add('active')
  }
}
