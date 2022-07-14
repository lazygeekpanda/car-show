import * as THREE from "three"

import effectsComposer from "./components/canvas/effects"

// import { cursor } from "./utils/cursor"

import { scene } from "./components/canvas/scene"
import { camera } from "./components/canvas/camera"
import { renderer } from "./components/canvas/renderer"
import { orbitControls } from "./components/canvas/orbitControls"
import lights from "./components/canvas/lights"
import { stats } from "./components/canvas/stats"

// Components
import mirror from "./components/mirror"
import ground from "./components/ground"
import { loadCar } from "./components/car"
import torus from "./components/torus"

import "./utils/resize"

camera.layers.enable(1)

/**
 * ----------------------
 * Scene
 * ----------------------
 */
torus.forEach((t) => {
  t.layers.enable(1)
  scene.add(t)
})
scene.add(camera, ...lights)
scene.add(ground)
scene.add(mirror)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)

scene.add(ambientLight, directionalLight)

const cameraTarget = camera.position.clone()

let cubeRenderTarget, cubeCamera

const init = () => {
  cameraTarget.set(1.5, 0.95, 5.5)

  // cubeRenderTarget = new THREE.WebGLRenderTarget(128, {
  //   format: THREE.RGBFormat,
  //   generateMipmaps: true,
  //   // encoding: THREE.sRGBEncoding,
  //   minFilter: THREE.LinearMipmapLinearFilter
  // })

  // setTimeout(() => {
  //   cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget)
  //   cubeCamera.position.set(0, 50, 0)
  //   scene.add(cubeCamera)
  // }, 100)

  tick()
}

/**
 * ----------------------
 * Animations
 * ----------------------
 */
// const clock = new THREE.Clock()
const tick = () => {
  window.requestAnimationFrame(tick)
  stats.begin()

  renderer.autoClear = false
  renderer.clear()
  console.log(camera)
  camera.layers.set(1)
  effectsComposer.render()

  // scene.traverse((child) => {
  //   if (child.isGroup) {
  //     const car = child.children[0]
  //     // car.visible = false
  //     // cubeCamera.position.copy(car.position)
  //     // car.visible = true
  //   }
  // })
  // cubeCamera.update(renderer, scene)

  camera.position.lerp(cameraTarget, 0.015)

  orbitControls.update()

  // Render scene
  renderer.clearDepth()
  camera.layers.set(0)
  renderer.render(scene, camera)
  stats.end()
}

loadCar().then((carScene) => {
  scene.add(carScene.scene)
  init()
})
