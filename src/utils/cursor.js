const cursorOuter = document.querySelector(".cursor.outer")
const cursorInner = document.querySelector(".cursor.inner")

window.addEventListener("mousemove", (event) => {
  const x = event.clientX
  const y = event.clientY

  cursorOuter.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
  cursorInner.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`
})
