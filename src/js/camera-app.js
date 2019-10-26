import { zIndex } from './desktop.js'
import { dragElement } from './drag.js'
const template = document.createElement('template')
template.innerHTML = `
<head>
<link rel="stylesheet" href="../css/camera-app.css" />
</head>
<div id="camera">
<div class="navbar">
<img id="pic" src="../image/tools.png" alt="paint" />
<img id="close" src="../image/error.png" alt="close window" />
</div>
<canvas id="cameraCanvas"></canvas>
<video id="cameraVideo" autoplay playsinline></video>
<img id="cameraImage" src="//:0" alt="camera output" class="removed" />
<input type="button" value="Take a picture" id="cameraButton"/>
</div>
`
let self
export class CameraApp extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.cameraCanvas = this.shadowRoot.querySelector('#cameraCanvas')
    this.cameraVideo = this.shadowRoot.querySelector('#cameraVideo')
    this.cameraImage = this.shadowRoot.querySelector('#cameraImage')
    this.cameraButton = this.shadowRoot.querySelector('#cameraButton')
    this.details = { video: { facingMode: 'user' }, audio: false }
    self = this
  }

  connectedCallback () {
    this.create()
    this.takePicture()
    this.closeWindow()
    this.focus()
    dragElement(this.shadowRoot.querySelector('#camera'))
  }

  closeWindow () {
    const close = this.shadowRoot.querySelector('#camera')
    close.addEventListener('click', event => {
      if (event.target === this.shadowRoot.querySelector('#close')) {
        close.classList.add('removed')
      }
    })
  }

  create () {
    navigator.mediaDevices.getUserMedia(this.details)
      .then(function (stream) {
        const track = stream.getTracks()[0]
        self.cameraVideo.srcObject = stream
      })
      .catch(function (error) {
        console.log('Something bad happened', error)
      })
  }

  takePicture () {
    this.cameraButton.addEventListener('click', event => {
      this.cameraCanvas.width = this.cameraVideo.videoWidth
      this.cameraCanvas.height = this.cameraVideo.videoHeight
      this.cameraCanvas.getContext('2d').drawImage(this.cameraVideo, 0, 0)
      this.cameraImage.classList.remove('removed')
      this.cameraImage.src = this.cameraCanvas.toDataURL('image/webp')
      this.cameraImage.classList.add('taken')
      this.cameraImage.style.zIndex = zIndex()
    })
  }

  focus () {
    this.shadowRoot.querySelector('#camera').addEventListener('click', event => {
      this.shadowRoot.querySelector('#camera').style.zIndex = zIndex()
    })
  }
}

window.customElements.define('camera-app', CameraApp)