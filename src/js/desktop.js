import './chat.js'
let topChat = 0
let leftChat = 0
function openChat () {
  const chatIcon = document.querySelector('#chat')
  chatIcon.addEventListener('click', event => {
    const chat = document.createElement('chat-board')
    chat.style.position = 'absolute'
    if (topChat < 150) {
      chat.style.top = topChat + 'px'
      chat.style.left = leftChat + 'px'
      topChat = topChat + 10
      leftChat = leftChat + 10
    } else if (leftChat < 730) {
      topChat = 0
      chat.style.top = topChat + 'px'
      chat.style.left = leftChat + 'px'
      topChat = topChat + 10
      leftChat = leftChat + 10
    } else {
      topChat = 0
      leftChat = 0
      chat.style.top = topChat + 'px'
      chat.style.left = leftChat + 'px'
      topChat = topChat + 10
      leftChat = leftChat + 10
    }
    document.body.appendChild(chat)
  })
}

export { openChat }
