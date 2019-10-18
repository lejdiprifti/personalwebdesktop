const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/paint-board.css">
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/tools.png" alt="paint" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="tools">
<div id="red" class="colour"></div>
<div id="pink" class="colour"></div>
<div id="black" class="colour"></div>
</div>
<div id="paint"></div>
</div>
`
export class PaintBoard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.closeWindow()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }
}

window.customElements.define('paint-board', PaintBoard)
