const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/memory.css"/>
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/memory.png" alt="memory" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="container">
</div>
</div>

`
export class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {

  }

  createGame (rows, cols) {
    let i = 0
    let img = null
    const container = this.shadowRoot.querySelector('#container')

    for (i = 0; i < rows * cols; i++) {
      img = document.createElement('img')
      img.setAttribute('src', '../image/memory/0.png')
      container.appendChild(img)

      if ((i + 1) % cols === 0) {
        container.appendChild(document.createElement('br'))
      }
    }
  }
}
window.customElements.define('memory-game', MemoryGame)
