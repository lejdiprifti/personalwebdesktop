const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/memory.css"/>
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/memory.png" alt="memory" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="tools"> 
<div id="timer">Timer is running...</div>
<div id="clicks"></div>
</div>
<div id="container">
<template>
<div class="memoryDiv">
    <a href="#"><img class="tabs" src="../image/memory/0.png" alt="memory tab" /></a>
</div>
</template>
</div>
</div>

`
export class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.timer = ''
    this.isTimeOver = false
  }

  connectedCallback () {
    this.createGame(2, 2)
    this.closeWindow()
    this.addTimer(10)
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  createGame (rows, cols) {
    let img = null
    let guess1
    let guess2
    const container = this.shadowRoot.querySelector('#container')
    const memoryTemplate = this.shadowRoot.querySelector('#container template').content.firstElementChild
    const div = document.importNode(memoryTemplate, false)
    const picArray = this.shufflePictures(rows, cols)
    picArray.forEach(function (tab, index) {
      img = document.importNode(memoryTemplate.firstElementChild, true)
      img.setAttribute('id', 'pic' + index)
      div.appendChild(img)
      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
      div.addEventListener('keyup', event => {
        event.preventDefault()
        if (event.keyCode === 13) {
          if (this.shadowRoot.querySelectorAll('.hidden').length === rows * cols) {
            console.log('You won')
          }
          const targetImg = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
          // if guess2 contains data, you shall not be able to click another tab
          if (guess2) {
            return
          }

          targetImg.src = '../image/memory/' + tab + '.png'
          if (!guess1) {
            guess1 = targetImg
          } else {
            if (targetImg === guess1) {
              return
            }
            guess2 = targetImg
            if (guess1.src === guess2.src) {
              setTimeout(function () {
                guess1.parentNode.classList.add('hidden')
                guess2.parentNode.classList.add('hidden')
                guess1 = null
                guess2 = null
              }, 400)
            } else {
              window.setTimeout(function () {
                guess1.src = '../image/memory/0.png'
                guess2.src = '../image/memory/0.png'
                guess1 = null
                guess2 = null
              }, 500)
            }
          }
        }
      })
    })
    container.appendChild(div)
  }

  shufflePictures (rows, cols) {
    const array = []
    let i = 0

    for (i = 1; i <= rows * cols / 2; i++) {
      array.push(i)
      array.push(i)
    }

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  addTimer (i) {
    if (i >= 0) {
      this.timer = setTimeout(timeout => {
        const spanTimeTag = this.shadowRoot.querySelector('#timer')
        spanTimeTag.textContent = 'Timer: ' + i + 's'
        this.isTimeOver = false
        this.addTimer(--i)
      }, 1000)
    } else {
      this.isTimeOver = true
      this.displayGameOver()
    }
  }

  displayGameOver () {
    this.shadowRoot.querySelector('#container').innerHTML = ''
    console.log('game over')
  }
}
window.customElements.define('memory-game', MemoryGame)
