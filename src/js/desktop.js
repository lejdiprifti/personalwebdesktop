import './chat.js'
import './paint-board.js'
import { dragElement } from './drag.js'
export { openChat, openPainting }
// the coordinates of the windows
let topChat = 0
let leftChat = 0

function openChat () {
  const chatIcon = document.querySelector('#chat')
  // create a chat board element for every click
  chatIcon.addEventListener('click', event => {
    const chat = document.createElement('chat-board')
    chat.style.position = 'absolute'
    // implementing draggable functionality on the board
    dragElement(chat)
    // for every click, stack the windows
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

// open painting tools
function openPainting () {
  const paintingIcon = document.querySelector('#paint')
  paintingIcon.addEventListener('click', event => {
    const paint = document.createElement('paint-board')
    paint.style.position = 'absolute'
    dragElement(paint)
    document.body.appendChild(paint)
  })
}
