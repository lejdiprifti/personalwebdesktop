import './chat.js'
import './paint-board.js'
import './memory-game.js'
import './change-settings.js'
import { dragElement } from './drag.js'
export { openChat, openPainting, openMemoryGame, zIndex, topMem, leftMem }
// the coordinates of the windows
let topChat = 0
let leftChat = 0
/**
 * zIndex stores the z-index, so any window opened next will show above all the others already opened.
 */
let zIndexNum = 0
function openChat () {
  const chatIcon = document.querySelector('#chat')
  // create a chat board element for every click
  chatIcon.addEventListener('click', event => {
    const chat = document.createElement('chat-board')
    chat.style.position = 'absolute'
    chat.style.zIndex = zIndex()
    chat.addEventListener('click', event => {
      chat.style.zIndex = zIndex()
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
    paint.style.zIndex = zIndex()
    paint.style.position = 'absolute'
    paint.addEventListener('click', event => {
      paint.style.zIndex = zIndex()
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

let topSett = 0
let leftSett = 0
let topMemNum = 0
let leftMemNum = 0
function openMemoryGame () {
  const memIcon = document.body.querySelector('#memory')
  memIcon.addEventListener('click', event => {
    const changeSettings = document.createElement('change-settings')
    dragElement(changeSettings)
    changeSettings.style.zIndex = zIndex()
    changeSettings.addEventListener('click', event => {
      changeSettings.style.zIndex = zIndex()
    })
    changeSettings.style.position = 'absolute'
    if (topSett < 60) {
      changeSettings.style.top = topSett + 'px'
      changeSettings.style.left = leftSett + 'px'
      topSett = topSett + 10
      leftSett = leftSett + 10
    } else if (leftSett < 500) {
      topSett = 0
      changeSettings.style.top = topSett + 'px'
      changeSettings.style.left = leftSett + 'px'
      topSett = topSett + 10
      leftSett = leftSett + 10
    } else {
      topSett = 0
      leftSett = 0
      changeSettings.style.top = topSett + 'px'
      changeSettings.style.left = leftSett + 'px'
      topSett = topSett + 10
      leftSett = leftSett + 10
    }
    document.body.appendChild(changeSettings)
  })
}

function zIndex () {
  zIndexNum = zIndexNum + 1
  return zIndexNum
}

function topMem () {
  topMemNum = topMemNum + 1
  return topMemNum
}

function leftMem () {
  leftMemNum = leftMemNum + 1
  return leftMemNum
}
