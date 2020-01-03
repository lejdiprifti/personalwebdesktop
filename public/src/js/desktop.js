/**
 * zIndex stores the z-index, so any window opened next will show above all the others already opened.
 */
let zIndexNum = 0
export function zIndex () {
  zIndexNum = zIndexNum + 1
  return zIndexNum
}
