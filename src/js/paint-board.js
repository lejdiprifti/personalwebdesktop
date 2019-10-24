import { dragElement } from './drag.js'
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
<div id="blue" class="colour"></div>
<div id="cyan" class="colour"></div>
<div id="purple" class="colour"></div>
<div id="green" class="colour"></div>
<div id="yellow" class="colour"></div>
<div id="input" class="colour">
<input id="brushValue" type="text" placeholder="width" />
</div>
<div id="bucketDiv" class="colour">
<img id="bucket" src="../image/paint-bucket.png" alt="bucket" />
</div>
</div>
<div id="paint">
<canvas id="canvasDrawing">
<p>Unfortunately, your browser is currently unsupported by our web 
application.  We are sorry for the inconvenience. Please use one of the 
supported browsers listed below, or draw the image you want using an 
offline tool.</p>
<p>Supported browsers: <a href="http://www.opera.com">Opera</a>, <a 
  href="http://www.mozilla.com">Firefox</a>, <a 
  href="http://www.apple.com/safari">Safari</a>, and <a 
  href="http://www.konqueror.org">Konqueror</a>.</p>
</canvas>
</div>
</div>
`
export class PaintBoard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.x = 0
    this.y = 0
    window.colour = 'black'
    this.canvas = this.shadowRoot.querySelector('#canvasDrawing')
    window.ctx = this.canvas.getContext('2d')
  }

  connectedCallback () {
    this.initialize()
    this.closeWindow()
    this.changeColour()
    this.changeLineWidth()
    this.changeBackground()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  // intialize drawing on the board
  initialize () {
    const paintingBoard = this.shadowRoot.querySelector('#paint')
    this.size()
    paintingBoard.addEventListener('mousemove', event => {
      event.stopImmediatePropagation()
      this.draw(event)
    })
    paintingBoard.addEventListener('mousedown', event => {
      event.stopImmediatePropagation()
      this.setPosition(event)
    })
    paintingBoard.addEventListener('mouseenter', event => {
      this.setPosition(event)
    })
    dragElement(this.shadowRoot.querySelector('#board'))
  }

  draw (e) {
    if (e.buttons !== 1) return // if mouse is pressed.....
    window.ctx.beginPath() // begin the drawing path
    window.ctx.lineCap = 'round' // rounded end cap
    window.ctx.strokeStyle = window.colour // hex color of line
    window.ctx.moveTo(this.x, this.y) // from position
    this.x = e.pageX - this.shadowRoot.querySelector('#board').offsetLeft - this.canvas.offsetLeft
    this.y = e.pageY - this.shadowRoot.querySelector('#board').offsetTop - this.canvas.offsetTop
    window.ctx.lineTo(this.x, this.y) // to position
    window.ctx.stroke() // draw it!
  }

  // size canvas
  size () {
    window.ctx.canvas.width = 750
    window.ctx.canvas.height = 510
  }

  // new position from mouse events
  setPosition (e) {
    this.x = e.clientX - this.shadowRoot.querySelector('#board').offsetLeft - this.canvas.offsetLeft
    this.y = e.clientY - this.shadowRoot.querySelector('#board').offsetTop - this.canvas.offsetTop
  }

  changeColour () {
    this.shadowRoot.querySelector('#red').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'red'
    })

    this.shadowRoot.querySelector('#pink').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'pink'
    })

    this.shadowRoot.querySelector('#black').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'black'
    })

    this.shadowRoot.querySelector('#yellow').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'yellow'
    })

    this.shadowRoot.querySelector('#purple').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'purple'
    })

    this.shadowRoot.querySelector('#cyan').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'cyan'
    })

    this.shadowRoot.querySelector('#green').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'green'
    })

    this.shadowRoot.querySelector('#blue').addEventListener('click', event => {
      event.stopImmediatePropagation()
      window.colour = 'blue'
    })
  }

  /**
  * whenever the value changes, the lineWidth will be updated
  * whenever the user clicks on the input field, it will get focus.
  */
  changeLineWidth () {
    const font = this.shadowRoot.querySelector('#brushValue')
    font.focus()
    font.addEventListener('change', event => {
      window.ctx.lineWidth = font.value
    })
    font.addEventListener('click', event => {
      font.focus()
    })
  }

  changeBackground () {
    const bucket = this.shadowRoot.querySelector('#bucket')
    bucket.addEventListener('click', event => {
      window.ctx.fillStyle = window.colour + ''
      window.ctx.fillRect(0, 0, window.ctx.canvas.width, window.ctx.canvas.height)
    })
  }
}

window.customElements.define('paint-board', PaintBoard)
