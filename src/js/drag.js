export { dragElement }
function dragElement (element) {
  let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
  setTimeout(() => {
    element.onmousedown = dragMouseDown
  }, 1000)

  function dragMouseDown (e) {
    e = e || window.event
    e.preventDefault()
    // get the mouse cursor position at startup:
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag
  }

  function elementDrag (e) {
    e = e || window.event
    e.preventDefault()
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    // set the element's new position:
    element.style.top = (element.offsetTop - pos2) + 'px'
    element.style.left = (element.offsetLeft - pos1) + 'px'
  }

  function closeDragElement () {
    // stop moving the window when mouse button is released
    document.onmouseup = null
    document.onmousemove = null
  }
}
