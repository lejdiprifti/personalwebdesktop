import { zIndex } from './desktop.js'
import './camera-app.js'
let topCam = 0
let leftCam = 0
export function openCamera () {
  const cameraIcon = document.querySelector('#camera')
  cameraIcon.addEventListener('click', event => {
    const camera = document.createElement('camera-app')
    camera.style.zIndex = zIndex()
    camera.addEventListener('click', event => {
      camera.style.zIndex = zIndex()
    })
    camera.style.position = 'absolute'
    if (topCam < 60) {
      camera.style.top = topCam + 'px'
      camera.style.left = leftCam + 'px'
      topCam = topCam + 10
      leftCam = leftCam + 10
    } else if (leftCam < 500) {
      topCam = 0
      camera.style.top = topCam + 'px'
      camera.style.left = leftCam + 'px'
      topCam = topCam + 10
      leftCam = leftCam + 10
    } else {
      topCam = 0
      leftCam = 0
      camera.style.top = topCam + 'px'
      camera.style.left = leftCam + 'px'
      topCam = topCam + 10
      leftCam = leftCam + 10
    }
    document.body.appendChild(camera)
  })
}
