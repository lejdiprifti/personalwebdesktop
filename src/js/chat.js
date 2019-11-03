import { zIndex } from './desktop.js'
/**
 * creating the chat element
 */
const template = document.createElement('template')
template.innerHTML = `
<head>
<meta charset = "utf-8">
<link rel="stylesheet" href="../css/chat.css">
</head>
<div id="chat">
<div class="navbar">
<img id="pic" src="../image/conversation.png" alt="chat" />
Chat
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="tools">
Change Username
</div>
<div class="messages"></div>
<div class="sendMessage removed">
<textarea id="write" placeholder="Write a message..."></textarea>
<a href="#"><img id="smiley" src="../image/chat/smiley.png" alt="Smiley" /></a>
<div id="emojis" class="removed">
<p>&#x1F600</p>
<p>&#x1F60D</p>
<p>&#x1F60A</p>
<p>&#x1F970</p>
<p>&#x1F493</p>
<p>&#x1F914</p>
<p>&#x1F602</p>
<p>&#x1F44D</p>
<p>&#x1F97A</p>
<p>&#x1F644</p>
<p>&#x1F601</p>
<p>&#x1F604</p>
<p>&#x26BD</p>
<p>&#x1F3C0</p>
<p>&#x1F974</p>
</div>
</div>
</div>
`
export class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.socket = new WebSocket('ws://vhost3.lnu.se:20080/socket/', 'mychannel')
    this.socket.onmessage = event => this.updateChat(event)
  }

  connectedCallback () {
    this.chat()
    this.closeWindow()
    this.openEmojis()
    this.addEmojis()
    this.changeUsername()
    this.shadowRoot.querySelector('#write').focus()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#chat')
    const input = this.shadowRoot.querySelector('#write')
    close.addEventListener('click', event => {
      // whenever the board gets clicked, the focus will be on the input field
      input.focus()
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
        this.socket.close()
      }
    })
  }

  chat () {
    const sendMsgDiv = this.shadowRoot.querySelector('.sendMessage')
    sendMsgDiv.classList.remove('removed')
    const input = this.shadowRoot.querySelector('#write')
    // get focus when clicked
    input.addEventListener('keydown', event => {
      input.focus()
      if (input.value.length > 0 && event.keyCode === 13) {
        this.sendMessage(input.value)
        input.value = ''
      }
    })
  }

  sendMessage (message) {
    const data = {
      type: 'message',
      data: message,
      username: window.localStorage.getItem('username'),
      channel: 'mychannel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    // show the sender message
    this.socket.send(JSON.stringify(data))
    const headerMsg = document.createElement('p')
    headerMsg.setAttribute('class', 'senderMessage')
    headerMsg.setAttribute('id', 'header')
    headerMsg.innerHTML = data.username
    const sentMsg = document.createElement('p')
    sentMsg.setAttribute('class', 'senderMessage')
    sentMsg.innerHTML = data.data
    this.shadowRoot.querySelector('.messages').appendChild(headerMsg)
    this.shadowRoot.querySelector('.messages').appendChild(sentMsg)
  }

  updateChat (msg) {
    // check if the reciever message is from the same user that sent it
    const message = JSON.parse(msg.data)
    if (message.username !== window.localStorage.getItem('username') && message.username !== 'The Server') {
      const recieverMessage = document.createElement('p')
      const headerMsg = document.createElement('p')
      headerMsg.setAttribute('class', 'senderMessage')
      headerMsg.setAttribute('id', 'header')
      headerMsg.innerHTML = message.username
      recieverMessage.setAttribute('class', 'recieverMessage')
      recieverMessage.innerHTML = message.data
      this.shadowRoot.querySelector('.messages').appendChild(headerMsg)
      this.shadowRoot.querySelector('.messages').appendChild(recieverMessage)
    }
  }

  openEmojis () {
    const smiley = this.shadowRoot.querySelector('#smiley')
    const emojis = this.shadowRoot.querySelector('#emojis')
    smiley.addEventListener('click', event => {
      event.preventDefault()
      emojis.classList.toggle('removed')
    })
  }

  addEmojis () {
    const emojis = this.shadowRoot.querySelector('#emojis')
    const input = this.shadowRoot.querySelector('#write')
    emojis.addEventListener('click', event => {
      if (event.target.nodeName === 'P') {
        const code = event.target.innerHTML
        input.value = input.value + code
      }
    })
  }

  changeUsername () {
    const change = this.shadowRoot.querySelector('#tools')
    change.addEventListener('click', event => {
      const changeUsername = document.createElement('change-username')
      changeUsername.setAttribute('data-changeusername', true)
      changeUsername.style.position = 'absolute'
      changeUsername.style.zIndex = zIndex() + 2
      document.body.appendChild(changeUsername)
    })
  }
}

window.customElements.define('chat-board', Chat)
