import { dragElement } from './drag.js'
import { zIndex } from './desktop.js'
import './chat.js'
import './change-username.js'
// the coordinates of the windows
let topChatNum = 0
let leftChatNum = 0
let topChange = 0
let leftChange = 0
export function openChat () {
  const chatIcon = document.querySelector('#chat')
  // create a chat board element for every click
  chatIcon.addEventListener('click', event => {
    if (window.localStorage.getItem('username') === null) {
      createUsernameBox()
    } else {
      createChatBox()
    }
  })
}

export function topChat () {
  topChatNum = topChatNum + 1
  return topChatNum
}

export function leftChat () {
  leftChatNum = leftChatNum + 1
  return leftChatNum
}

export function createUsernameBox () {
  const change = document.createElement('change-username')
  change.style.position = 'absolute'
  change.style.zIndex = zIndex()
  change.addEventListener('click', event => {
    change.style.zIndex = zIndex()
  })
  // implementing draggable functionality on the board
  dragElement(change)
  // for every click, stack the windows
  if (topChange < 150) {
    change.style.top = topChange + 'px'
    change.style.left = leftChange + 'px'
    topChange = topChange + 10
    leftChange = leftChange + 10
  } else if (leftChange < 730) {
    topChange = 0
    change.style.top = topChange + 'px'
    change.style.left = leftChange + 'px'
    topChange = topChange + 10
    leftChange = leftChange + 10
  } else {
    topChange = 0
    leftChange = 0
    change.style.top = topChange + 'px'
    change.style.left = leftChange + 'px'
    topChange = topChange + 10
    leftChange = leftChange + 10
  }
  document.body.appendChild(change)
}

export function createChatBox () {
  const chat = document.createElement('chat-board')
  chat.style.position = 'absolute'
  chat.style.zIndex = zIndex()
  chat.addEventListener('click', event => {
    chat.style.zIndex = zIndex()
  })
  // implementing draggable functionality on the board
  dragElement(chat)
  // for every click, stack the windows
  if (topChatNum < 150) {
    chat.style.top = topChatNum + 'px'
    chat.style.left = leftChatNum + 'px'
    topChatNum = topChatNum + 10
    leftChatNum = leftChatNum + 10
  } else if (leftChatNum < 830) {
    topChatNum = 0
    chat.style.top = topChatNum + 'px'
    chat.style.left = leftChatNum + 'px'
    topChatNum = topChatNum + 10
    leftChatNum = leftChatNum + 10
  } else {
    topChatNum = 0
    leftChatNum = 0
    chat.style.top = topChatNum + 'px'
    chat.style.left = leftChatNum + 'px'
    topChatNum = topChatNum + 10
    leftChatNum = leftChatNum + 10
  }
  document.body.appendChild(chat)
}
