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
<img id="pic" src="../image/conversation.png" alt="chat" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div class="messages"></div>
<div class="sendMessage removed">
<input id="write" type="textarea" placeholder="Write a message..." />
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
    this.shadowRoot.querySelector('#write').focus()
  }

  pickUsername () {
    if (window.localStorage.getItem('username') === null) {
      const loginDiv = this.shadowRoot.querySelector('.messages')
      loginDiv.classList.add('login')

      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('placeholder', 'Pick a username...')
      // get focus when clicked
      input.addEventListener('click', event => {
        input.focus()
      })
      const submit = document.createElement('input')
      submit.setAttribute('type', 'submit')
      submit.setAttribute('value', 'Save')
      submit.addEventListener('click', event => {
        if (input.value.length > 0) {
          window.localStorage.setItem('username', input.value)
          input.classList.add('removed')
          submit.classList.add('removed')
          loginDiv.classList.remove('login')
          this.chat()
        }
      })
      loginDiv.appendChild(input)
      loginDiv.appendChild(submit)
    } else {
      this.chat()
    }
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#chat')
    const input = this.shadowRoot.querySelector('#write')
    close.addEventListener('click', event => {
      // whenever the board gets clicked, the focus will be on the input field
      input.focus()
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
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
