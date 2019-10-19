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
    const canvas = this.shadowRoot.querySelector('#canvasDrawing')
    window.ctx = canvas.getContext('2d')
  }

  connectedCallback () {
    this.initialize()
    this.closeWindow()
    this.changeColour()
  }

  draw (e) {
    if (e.buttons !== 1) return // if mouse is pressed.....
    window.ctx.beginPath() // begin the drawing path
    window.ctx.lineWidth = 3 // width of line
    window.ctx.lineCap = 'round' // rounded end cap
    window.ctx.strokeStyle = window.colour // hex color of line
    console.log(window.colour)
    window.ctx.moveTo(this.x, this.y) // from position
    this.x = e.clientX
    this.y = e.clientY
    window.ctx.lineTo(this.x, this.y) // to position
    window.ctx.stroke() // draw it!
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
    const board = this.shadowRoot.querySelector('#board')
    this.resize()
    board.addEventListener('mousemove', this.draw)
    board.addEventListener('mousedown', this.setPosition)
    board.addEventListener('mouseenter', this.setPosition)
  }

  // resize canvas when window is resized
  resize () {
    window.ctx.canvas.width = 750
    window.ctx.canvas.height = 480
  }

  // new position from mouse events
  setPosition (e) {
    this.x = e.clientX
    this.y = e.clientY
  }

  changeColour () {
    this.shadowRoot.querySelector('#red').addEventListener('click', event => {
      window.colour = 'red'
      console.log('red')
    })

    this.shadowRoot.querySelector('#pink').addEventListener('click', event => {
      window.colour = 'pink'
    })

    this.shadowRoot.querySelector('#black').addEventListener('click', event => {
      window.colour = 'black'
    })

    this.shadowRoot.querySelector('#yellow').addEventListener('click', event => {
      window.colour = 'yellow'
    })

    this.shadowRoot.querySelector('#purple').addEventListener('click', event => {
      window.colour = 'purple'
    })

    this.shadowRoot.querySelector('#cyan').addEventListener('click', event => {
      window.colour = 'cyan'
    })

    this.shadowRoot.querySelector('#green').addEventListener('click', event => {
      window.colour = 'green'
    })

    this.shadowRoot.querySelector('#blue').addEventListener('click', event => {
      window.colour = 'blue'
    })
  }
}

window.customElements.define('paint-board', PaintBoard)
