import './chat.js'
import './paint-board.js'
import './memory-game.js'
import { dragElement } from './drag.js'
export { openChat, openPainting, openMemoryGame }
// the coordinates of the windows
let topChat = 0
let leftChat = 0
let zIndex = 0
function openChat () {
  const chatIcon = document.querySelector('#chat')
  // create a chat board element for every click
  chatIcon.addEventListener('click', event => {
    const chat = document.createElement('chat-board')
    chat.style.position = 'absolute'
    chat.style.zIndex = zIndex
    zIndex = zIndex + 1
    chat.addEventListener('click', event => {
      chat.style.zIndex = zIndex
      zIndex++
    })
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
let topPaint = 0
let leftPaint = 0
function openPainting () {
  const paintingIcon = document.querySelector('#paint')
  paintingIcon.addEventListener('click', event => {
    const paint = document.createElement('paint-board')
    paint.style.zIndex = zIndex
    zIndex = zIndex + 1
    paint.style.position = 'absolute'
    paint.addEventListener('click', event => {
      paint.style.zIndex = zIndex
      zIndex++
    })
    if (topPaint < 60) {
      paint.style.top = topPaint + 'px'
      paint.style.left = leftPaint + 'px'
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    } else if (leftPaint < 500) {
      topPaint = 0
      paint.style.top = topPaint + 'px'
      paint.style.left = leftPaint + 'px'
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    } else {
      topPaint = 0
      leftPaint = 0
      paint.style.top = topPaint + 'px'
      paint.style.left = leftPaint + 'px'
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    }
    document.body.appendChild(paint)
  })
}

let topMem = 0
let leftMem = 0
function openMemoryGame () {
  const memIcon = document.body.querySelector('#memory')
  memIcon.addEventListener('click', event => {
    const memGame = document.createElement('memory-game')
    memGame.style.zIndex = zIndex
    zIndex = zIndex + 1
    memGame.addEventListener('click', event => {
      memGame.style.zIndex = zIndex
      zIndex++
    })
    memGame.style.position = 'absolute'
    if (topMem < 60) {
      memGame.style.top = topMem + 'px'
      memGame.style.left = leftMem + 'px'
      topMem = topMem + 10
      leftMem = leftMem + 10
    } else if (leftMem < 500) {
      topMem = 0
      memGame.style.top = topMem + 'px'
      memGame.style.left = leftMem + 'px'
      topMem = topMem + 10
      leftMem = leftMem + 10
    } else {
      topMem = 0
      leftMem = 0
      memGame.style.top = topMem + 'px'
      memGame.style.left = leftMem + 'px'
      topMem = topMem + 10
      leftMem = leftMem + 10
    }
    document.body.appendChild(memGame)
    dragElement(memGame)
  })
}
