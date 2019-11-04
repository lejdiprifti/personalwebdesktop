import './change-settings.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/memory.css"/>
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/memory.png" alt="memory" />
Memory Game
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="data"> 
<div id="timer">Timer is running...</div>
<div id="clicks">Number of clicks: 0</div>
</div>
<div id="container">
<template>
<div class="memoryDiv">
    <a href="#"><img class="tabs" src="" alt="memory tab" /></a>
</div>
</template>
</div>
<div id="gameover" class="removed">
<img src="../image/memory/game-over.png" alt="game over" />
</div>
<div id="won" class="removed">
<img id="snoopDog" src="../image/memory/snoopdog.gif" alt="Snoop Dog" />
<img id="someone" src="../image/memory/someone.gif" alt="Someone celebrating" />
<img id="partyGIF" src="../image/memory/party.gif" alt="Party" />
<img id="wonGIF" src="../image/memory/youwon.gif" alt="You won" />
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
    this.createGame(parseInt(this.getAttribute('data-rows')),
      parseInt(this.getAttribute('data-cols')),
      this.getAttribute('data-image'))
    this.closeWindow()
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  createGame (rows, cols, dataImage) {
    let img = null
    let guess1 // store the first guess of the user
    let guess2 // store the second guess of the user
    this.addTimer(10)
    const container = this.shadowRoot.querySelector('#container')
    const memoryTemplate = this.shadowRoot.querySelector('#container template').content.firstElementChild
    const div = document.importNode(memoryTemplate, false)

    const picArray = this.shufflePictures(rows, cols)
    // display the number of attempts the user does
    const attemptsDiv = this.shadowRoot.querySelector('#clicks')
    let attempts = 0
    let tries = 0
    picArray.forEach(function (tab, index) {
      img = document.importNode(memoryTemplate.firstElementChild, true)
      img.firstElementChild.src = '../image/memory/' + dataImage + '/0.png'
      img.firstElementChild.setAttribute('data-tab', tab)
      div.appendChild(img)
      if ((index + 1) % cols === 0) {
        div.appendChild(document.createElement('br'))
      }
    })

    /**
     * when the div is clicked, I capture the target of the div and flip the tabs when clicked
     */
    div.addEventListener('click', event => {
      event.preventDefault()
      const targetImg = event.target.nodeName === 'IMG' ? event.target : event.target.firstElementChild
      // if guess2 contains data, you shall not be able to click another tab
      if (guess2) {
        return
      }
      targetImg.src = '../image/memory/' + dataImage + '/' + targetImg.getAttribute('data-tab') + '.png'
      if (!guess1) {
        guess1 = targetImg
      } else {
        if (targetImg === guess1) {
          return
        }
        guess2 = targetImg
        tries = tries + 1
        attemptsDiv.innerHTML = 'Number of clicks: ' + tries
        if (guess1.src === guess2.src) {
          attempts = attempts + 1
          //  check if the game is won
          if (attempts === (cols * rows) / 2) {
            this.checkWin(this.timer)
          }
          setTimeout(function () {
            guess1.parentNode.classList.add('hidden')
            guess2.parentNode.classList.add('hidden')
            guess1 = null
            guess2 = null
          }, 400)
        } else {
          window.setTimeout(function () {
            guess1.src = '../image/memory/' + dataImage + '/0.png'
            guess2.src = '../image/memory/' + dataImage + '/0.png'
            guess1 = null
            guess2 = null
          }, 500)
        }
      }
    })
    container.appendChild(div)
  }

  // shuffle the pcitures in a random order
  shufflePictures (rows, cols) {
    const array = []
    let i

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
    this.shadowRoot.querySelector('#container').classList.add('removed')
    this.shadowRoot.querySelector('#gameover').classList.remove('removed')
  }

  checkWin (timer) {
    this.shadowRoot.querySelector('#won').classList.remove('removed')
    clearTimeout(timer)
  }
}
window.customElements.define('memory-game', MemoryGame)
