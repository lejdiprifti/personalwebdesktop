import { isFinished, setWidth, setCap } from './paint-board.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/paint-settings.css" />
</head>
<div id="board">
<div class="navbar">
<img id="pic" src="../image/tools.png" alt="paint" />
Settings
<img id="close" src="../image/error.png" alt="close window" />
</div>
<div id="lineWidth">
<label>Choose line width</label>
<select>
<template>
<option class="widthSelected"></option>
</template>
</select>
</div>
<div id="capType">
<label>Type of cap</label>
<select>
<template>
<option class="capSelected"></option>
</template>
</select>
<input id="submit" type="submit" value="Save" />
</div>
`
export class PaintSettings extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  connectedCallback () {
    this.createBoard()
    this.closeWindow()
    this.shadowRoot.querySelector('input').addEventListener('click', event => {
      this.setLineWidth()
      this.setCapType()
      isFinished()
    })
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#board')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
        isFinished()
      }
    })
  }

  createBoard () {
    // add the options for line width
    let option = null
    const optionTemplate = this.shadowRoot.querySelector('#lineWidth template').content
    const select = document.importNode(optionTemplate, false)
    for (let i = 2; i < 100; i = i + 2) {
      option = document.importNode(optionTemplate.firstElementChild, true)
      option.innerText = i
      select.appendChild(option)
    }
    this.shadowRoot.querySelectorAll('select')[0].appendChild(select)
    // add the options for cap type
    let cap = null
    const capTemplate = this.shadowRoot.querySelector('#capType template').content
    const capSelect = document.importNode(capTemplate, false)
    const array = ['round', 'square', 'butt']
    for (let i = 0; i < 3; i++) {
      cap = document.importNode(capTemplate.firstElementChild, true)
      cap.innerText = array[i]
      capSelect.appendChild(cap)
    }
    this.shadowRoot.querySelector('#capType select').appendChild(capSelect)
  }

  setLineWidth () {
    this.shadowRoot.querySelectorAll('.widthSelected').forEach(element => {
      if (element.selected) {
        setWidth(parseInt(element.value))
      }
    })
  }

  setCapType () {
    this.shadowRoot.querySelectorAll('.capSelected').forEach(element => {
      if (element.selected) {
        setCap(element.value)
      }
    })
  }
}

window.customElements.define('paint-settings', PaintSettings)
