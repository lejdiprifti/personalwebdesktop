import { dragElement } from './drag.js'
import { zIndex } from './desktop.js'
import { triggerEvent } from './openChat.js'
import './memory-game.js'
import './change-settings.js'
let topSett = 0
let leftSett = 0
let topMemNum = 0
let leftMemNum = 0
export function openMemoryGame () {
  const memIcon = document.body.querySelector('#memory')
  memIcon.addEventListener('click', event => {
    const changeSettings = document.createElement('change-settings')
    dragElement(changeSettings)
    changeSettings.style.zIndex = zIndex()
    triggerEvent({
      username: window.localStorage.getItem('username'),
      app: 'Memory Game'
    })
    changeSettings.addEventListener('click', event => {
      changeSettings.style.zIndex = zIndex()
    })
    changeSettings.style.position = 'absolute'
    if (topSett < 350) {
      changeSettings.style.top = topSett + 'px'
      changeSettings.style.left = leftSett + 'px'
      topSett = topSett + 10
      leftSett = leftSett + 10
    } else if (leftSett < 1000) {
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

export function topMem () {
  topMemNum = topMemNum + 10
  return topMemNum
}

export function leftMem () {
  leftMemNum = leftMemNum + 10
  return leftMemNum
}
