import * as THREE from "three"

const cursorOuter = document.querySelector(".cursor.outer")
const cursorInner = document.querySelector(".cursor.inner")

export const pointer = new THREE.Vector2();

export const cursor = {
  x: 0,
  y: 0,
  z: 0
}

window.addEventListener("mousemove", (event) => {
  const x = event.clientX
  const y = event.clientY

  pointer.x = (x / window.innerWidth) * 2 - 1
  pointer.y = -(y / window.innerHeight) * 2 + 1

  cursorOuter.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  cursorInner.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  // cursorInner.style.left = x + 'px'
  // cursorInner.style.top = y + 'px'
})

// window.addEventListener("wheel", (event) => {
//   console.log(event)
// })
