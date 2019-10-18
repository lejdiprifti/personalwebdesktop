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
<div class="messages"></div>
<div class="sendMessage removed">
<input id="write" type="text" />
<input id="submit" type="button" value="Send" />
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
    this.pickUsername()
    this.closeWindow()
  }

  pickUsername () {
    if (window.localStorage.getItem('username') === null) {
      const chat = this.shadowRoot.querySelector('#chat')
      const loginDiv = document.createElement('div')
      loginDiv.setAttribute('class', 'login')
      const input = document.createElement('input')
      input.setAttribute('id', 'write')
      input.setAttribute('type', 'text')
      const submit = document.createElement('input')
      submit.setAttribute('type', 'submit')
      loginDiv.appendChild(input)
      loginDiv.appendChild(submit)
      loginDiv.style.top = chat.clientTop
      this.shadowRoot.appendChild(loginDiv)
      submit.addEventListener('click', event => {
        window.localStorage.setItem('username', input.value)
        if (window.localStorage.getItem('username').length > 0) {
          loginDiv.classList.add('removed')
          this.chat()
        }
      })
    } else {
      this.chat()
    }
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

  chat () {
    const sendMsgDiv = this.shadowRoot.querySelector('.sendMessage')
    sendMsgDiv.classList.remove('removed')
    const submit = this.shadowRoot.querySelector('#submit')
    const input = this.shadowRoot.querySelector('#write')
    input.innerHTML = ''
    input.setAttribute('placeholder', 'Write a message...')
    submit.addEventListener('click', event => {
      event.stopPropagation()
      this.sendMessage(input.value)
      input.value = ''
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
    const sentMsg = document.createElement('p')
    sentMsg.setAttribute('class', 'senderMessage')
    sentMsg.innerHTML = data.username + ' : ' + data.data
    this.shadowRoot.querySelector('.messages').appendChild(sentMsg)
  }

  updateChat (msg) {
    // check if the reciever message is from the same user that sent it
    const message = JSON.parse(msg.data)
    console.log(message)
    if (message.username !== window.localStorage.getItem('username') && message.username !== 'The Server') {
      console.log('message arrived')
      const recieverMessage = document.createElement('p')
      recieverMessage.setAttribute('class', 'recieverMessage')
      recieverMessage.innerHTML = message.username + ' : ' + message.data
      this.shadowRoot.querySelector('.messages').appendChild(recieverMessage)
    }
  }
}

window.customElements.define('chat-board', Chat)
