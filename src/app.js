import * as THREE from "three"
import * as dat from "dat.gui"

// import { textureLoader } from "./utils/loaders"
import { cursor } from "./utils/cursor"

import { scene } from "./components/canvas/scene"
import { camera } from "./components/canvas/camera"
import { renderer } from "./components/canvas/renderer"
import { composer } from "./components/canvas/effects"
import { orbitControls } from "./components/canvas/orbitControls"
import lights from "./components/canvas/lights"
import { stats } from "./components/canvas/stats"

// Components
import ground from "./components/ground"
import "./components/car"

import "./utils/resize"

/**
 * ----------------------
 * Scene
 * ----------------------
 */
scene.add(camera)
scene.add(...lights)
scene.add(ground)

/**
 * ----------------------
 * Animations
 * ----------------------
 */
const tick = () => {
  stats.begin()

  stats.end()
  // Call tick on next frame
  window.requestAnimationFrame(tick)

  orbitControls.update()

  // Render scene
  composer.render()
  renderer.render(scene, camera)
}

tick()
