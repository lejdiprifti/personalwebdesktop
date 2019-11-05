import './memory-game.js'
import { topMem, leftMem } from './openMemoryGame.js'
import { zIndex } from './desktop.js'
import { dragElement } from './drag.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/change-settings.css" />
</head>
<div id="settings">
<div class="navbar">
<img id="pic" src="../image/memory.png" alt="memory" />
Memory Game
<img id="close" src="../image/error.png" alt="close window" />
</div>
<p>Choose the board</p>
<div id="size">
<input id="size-of-board1" type="radio" name="size" value="2x2" checked>
<label for="size-of-board1">2x2</label>
<input id="size-of-board2" type="radio" name="size" value="2x4">
<label for="size-of-board2">2x4</label>
<input id="size-of-board3" type="radio" name="size" value="4x2">
<label for="size-of-board3">4x2</label>
<input id="size-of-board4" type="radio" name="size" value="4x4">
<label for="size-of-board4">4x4</label>
</div>
<div id="image">
<input id="image1" type="radio" name="image" value="soccer.png" checked>
<label for="image1"><img id="img1" src="../image/memory/soccer.png" alt="football" /></label>
<input id="image2" type="radio" name="image" value="statue.png">
<label for="image2"><img src="../image/memory/statue.png" alt="statues"/></label>
<input id="image3" type="radio" name="image" value="image3.png">
<label for="image3"><img src="../image/memory/image3.png" alt="earth"/></label>
</div>
<input type="button" id="submit" value="Play" />
</div>
`
export class ChangeSettings extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.pickGameSize()
    this.closeWindow()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#settings')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  pickGameSize () {
    const submit = this.shadowRoot.querySelector('#submit')
    const settings = this.shadowRoot.querySelector('#settings')
    submit.addEventListener('click', event => {
      const memGame = document.createElement('memory-game')
      memGame.style.position = 'absolute'
      memGame.style.zIndex = zIndex()
      memGame.style.top = topMem() + 'px'
      memGame.style.left = leftMem() + 'px'
      console.log(memGame.style.top, memGame.style.left)
      dragElement(memGame)
      memGame.addEventListener('click', event => {
        memGame.style.zIndex = zIndex()
      })
      if (this.shadowRoot.querySelector('#size-of-board1').checked) {
        memGame.setAttribute('data-rows', 2)
        memGame.setAttribute('data-cols', 2)
      } else if (this.shadowRoot.querySelector('#size-of-board2').checked) {
        memGame.setAttribute('data-rows', 2)
        memGame.setAttribute('data-cols', 4)
      } else if (this.shadowRoot.querySelector('#size-of-board3').checked) {
        memGame.setAttribute('data-rows', 4)
        memGame.setAttribute('data-cols', 2)
      } else if (this.shadowRoot.querySelector('#size-of-board4').checked) {
        memGame.setAttribute('data-rows', 4)
        memGame.setAttribute('data-cols', 4)
      }

      if (this.shadowRoot.querySelector('#image1').checked) {
        memGame.setAttribute('data-image', 'football')
      } else if (this.shadowRoot.querySelector('#image2').checked) {
        memGame.setAttribute('data-image', 'monuments')
      } else if (this.shadowRoot.querySelector('#image3').checked) {
        memGame.setAttribute('data-image', 'world')
      }
      settings.classList.add('removed')
      document.body.appendChild(memGame)
    })
  }
}

window.customElements.define('change-settings', ChangeSettings)
