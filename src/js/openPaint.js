import { zIndex } from './desktop.js'
import './paint-board.js'
// open painting tools
let topPaint = 0
let leftPaint = 0
export function openPainting () {
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
      paint.setAttribute('data-top', topPaint)
      paint.setAttribute('data-left', leftPaint)
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    } else if (leftPaint < 500) {
      topPaint = 0
      paint.style.top = topPaint + 'px'
      paint.style.left = leftPaint + 'px'
      paint.setAttribute('data-top', topPaint)
      paint.setAttribute('data-left', leftPaint)
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    } else {
      topPaint = 0
      leftPaint = 0
      paint.style.top = topPaint + 'px'
      paint.style.left = leftPaint + 'px'
      paint.setAttribute('data-top', topPaint)
      paint.setAttribute('data-left', leftPaint)
      topPaint = topPaint + 10
      leftPaint = leftPaint + 10
    }
    document.body.appendChild(paint)
  })
}
