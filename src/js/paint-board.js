import { dragElement } from './drag.js'
import './paint-settings.js'
import { zIndex } from './desktop.js'
export { isFinished, setWidth, setCap }
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/paint-board.css">
</head>
<div>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/tools.png" alt="paint" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="settings">
Change Settings
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
<div id="changeSettings" class="removed">
</div>
</div>
`
let self
export class PaintBoard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.x = 0
    this.y = 0
    this.colour = 'black'
    this.canvas = this.shadowRoot.querySelector('#canvasDrawing')
    this.ctx = this.canvas.getContext('2d')
  }

  connectedCallback () {
    this.initialize()
    this.closeWindow()
    this.changeColour()
    this.changeBackground()
    this.changeSettings()
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
    paintingBoard.addEventListener('click', event => {
      this.setPosition(event)
    })
    dragElement(this.shadowRoot.querySelector('#board'))
  }

  draw (e) {
    if (e.buttons !== 1) return // if mouse is pressed.....
    this.ctx.beginPath() // begin the drawing path
    this.ctx.lineCap = this.getAttribute('data-cap') // cap
    this.ctx.strokeStyle = this.colour // color of line
    this.ctx.lineWidth = this.getAttribute('data-width')
    this.ctx.moveTo(this.x, this.y) // from position
    this.x = e.pageX - this.shadowRoot.querySelector('#board').offsetLeft - this.canvas.offsetLeft
    this.y = e.pageY - this.shadowRoot.querySelector('#board').offsetTop - this.canvas.offsetTop
    this.ctx.lineTo(this.x, this.y) // to position
    this.ctx.stroke() // draw it!
  }

  // size canvas
  size () {
    this.ctx.canvas.width = 750
    this.ctx.canvas.height = 510
  }

  // new position from mouse events
  setPosition (e) {
    this.x = e.clientX - this.shadowRoot.querySelector('#board').offsetLeft - this.canvas.offsetLeft
    this.y = e.clientY - this.shadowRoot.querySelector('#board').offsetTop - this.canvas.offsetTop
  }

  changeColour () {
    this.shadowRoot.querySelector('#red').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'red'
    })

    this.shadowRoot.querySelector('#pink').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'pink'
    })

    this.shadowRoot.querySelector('#black').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'black'
    })

    this.shadowRoot.querySelector('#yellow').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'yellow'
    })

    this.shadowRoot.querySelector('#purple').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'purple'
    })

    this.shadowRoot.querySelector('#cyan').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'cyan'
    })

    this.shadowRoot.querySelector('#green').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'green'
    })

    this.shadowRoot.querySelector('#blue').addEventListener('click', event => {
      event.stopImmediatePropagation()
      this.colour = 'blue'
    })
  }

  changeBackground () {
    const bucket = this.shadowRoot.querySelector('#bucket')
    bucket.addEventListener('click', event => {
      this.ctx.fillStyle = this.colour + ''
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    })
  }

  changeSettings () {
    this.shadowRoot.querySelector('#settings').addEventListener('click', event => {
      const paintSett = document.createElement('paint-settings')
      this.shadowRoot.querySelector('#changeSettings').classList.remove('removed')
      paintSett.classList.add('paintSettings')
      paintSett.addEventListener('click', event => {
        paintSett.style.zIndex = zIndex()
      })
      self = this
      this.shadowRoot.querySelector('#changeSettings').appendChild(paintSett)
    })
  }
}

function isFinished () {
  self.shadowRoot.querySelector('#changeSettings').classList.add('removed')
}

function setWidth (num) {
  self.setAttribute('data-width', num)
}

function setCap (cap) {
  self.setAttribute('data-cap', cap)
}

window.customElements.define('paint-board', PaintBoard)
