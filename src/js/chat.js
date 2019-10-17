/**
 * creating the chat element
 */
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/chat.css">
</head>
<div id="chat">
<div class="navbar">
<img id="close" src="../image/error.png" alt="close window" />
<p id="timestamp"></p>
</div>
<div class="messages">
<div class="senderMessage"></div>
<div class="recieverMessage"></div>
</div>
<div id="sendMessage">
<input id="write" type="text" placeholder="Write message..." />
<input id="submit" type="button" value="Send" />
</div
</div>
`
class Chat extends window.HTMLElement {
  constructor () {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.time = this.shadowRoot.querySelector('#timestamp')
  }

  connectedCallback () {
    this.time.innerHTML = new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
    this.closeWindow()
    // when submit clicked send the message inside input
    this.shadowRoot.querySelector('#submit').addEventListener('click', event => {
      this.sendMessage(this.shadowRoot.querySelector('#write').value)
    })
  }

  closeWindow () {
    const close = this.shadowRoot.querySelectorAll('#chat')
    close.forEach(element => {
      element.addEventListener('click', event => {
        if (event.target === this.shadowRoot.querySelector('#close')) {
          element.classList.add('removed')
        }
      })
    })
  }

  sendMessage (message) {
    const data = {
      type: 'message',
      data: message,
      username: 'MyFancyUsername',
      channel: 'mychannel',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    const socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/', 'mychannel')
    socket.addEventListener('open', event => {
      socket.send(JSON.stringify(data))
      this.shadowRoot.querySelector('.senderMessage').innerHTML = data.data
    })
    socket.addEventListener('message', event => {
      this.shadowRoot.querySelector('.recieverMessage').innerHTML = data.data
    })
  }
}

window.customElements.define('chat-board', Chat)
