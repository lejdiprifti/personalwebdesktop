import './chat.js'
import { topChat, leftChat } from './openChat.js'
import { zIndex } from './desktop.js'
import { dragElement } from './drag.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/change-username.css" />
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/conversation.png" alt="chat" />
Chat
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="change">
<p>Pick a username</p>
<input type="text" id="newUsername" />
<input type="button" id="submit" value="Save"/>
</div>
</div>
`
export class ChangeUsername extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.closeWindow()
    this.changeUsername()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  changeUsername () {
    this.getFocused()
    const button = this.shadowRoot.querySelector('#submit')
    const input = this.shadowRoot.querySelector('#newUsername')
    const isFromTheChatApp = this.getAttribute('data-changeusername')
    input.setAttribute('value', window.localStorage.getItem('username') || 'Unknown')
    input.addEventListener('click', event => {
      input.focus()
    })
    button.addEventListener('click', event => {
      window.localStorage.setItem('username', input.value)
      this.shadowRoot.querySelector('#board').classList.add('removed')
      if (isFromTheChatApp !== 'true') {
        const chat = document.createElement('chat-board')
        chat.style.position = 'absolute'
        chat.style.zIndex = zIndex()
        chat.style.top = topChat()
        chat.style.left = leftChat()
        chat.addEventListener('click', event => {
          chat.style.zIndex = zIndex()
        })
        // implementing draggable functionality on the board
        dragElement(chat)
        document.body.appendChild(chat)
      }
    })
  }

  getFocused () {
    const board = this.shadowRoot.querySelector('#board')
    dragElement(board)
    board.addEventListener('click', event => {
      board.style.zIndex = zIndex()
    })
  }
}

window.customElements.define('change-username', ChangeUsername)
