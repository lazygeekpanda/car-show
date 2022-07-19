import * as THREE from "three"

import { cursor } from "./utils/cursor"

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
import grid, { renderGrid } from "./components/grid"
import boxes, { renderBoxes } from "./components/boxes"
import rings, { renderRings } from "./components/rings"

import effectsComposer from "./components/canvas/effects"
import "./utils/resize"
import { gui } from "./components/canvas/gui"

camera.layers.enable(1)

/**
 * ----------------------
 * Scene
 * ----------------------
 */
scene.add(camera, ...lights)
scene.add(ground)
// scene.add(mirror)
scene.add(grid)
scene.add(boxes)
scene.add(...rings)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.75)

scene.add(ambientLight, directionalLight)

const cameraTarget = camera.position.clone()

let cubeCamera, cubeRenderTarget, carModel
let cameraTargetFinished = false

const init = () => {
  cameraTarget.set(1.2, 0.95, 3.5)
  camera.position.copy(cameraTarget)

  render()
  initCubeCamera()

  setTimeout(() => {
    cameraTargetFinished = true
  }, 10000)
}

const initCubeCamera = () => {
  cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
    generateMipmaps: true,
    encoding: THREE.sRGBEncoding,
    // minFilter: THREE.LinearMipmapLinearFilter
  })
  cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)

  scene.add(cubeCamera)

  carModel.scene.visible = false
  cubeCamera.position.copy(carModel.scene.position)
  cubeCamera.update(renderer, scene)
  carModel.scene.visible = true

  carModel.scene.traverse((object) => {
    if (object.isMesh) {
      object.material.envMap = cubeRenderTarget.texture
    }
  })
}

/**
 * ----------------------
 * Animations
 * ----------------------
 */

const clock = new THREE.Clock()

const render = () => {
  let t = clock.getElapsedTime()

  window.requestAnimationFrame(render)

  renderer.autoClear = false
  renderer.clear()
  camera.layers.set(1)
  effectsComposer.render()

  // camera.position.x += Math.sin(t) / 100
  camera.position.z += Math.sin(t) / 1000
  camera.position.y += Math.sin(t) / 1000

  // if (!cameraTargetFinished) {
  //   camera.position.lerp(cameraTarget, 0.01)
  // } else {
  //   camera.position.x += Math.sin(t) / 100
  //   camera.position.y += Math.sin(t) / 500
  // }

  orbitControls.update()

  renderBoxes()
  renderGrid()
  renderRings()

  // Render scene
  renderer.clearDepth()
  camera.layers.set(0)
  renderCar()
  renderer.render(scene, camera)

  stats.update()
}

const renderCar = () => {
  let t = clock.getElapsedTime()

  let group = carModel.scene.children[0].children[0].children[0]
  group.children[0].rotation.x += 0.15
  group.children[2].rotation.x += 0.15
  group.children[4].rotation.x += 0.15
  group.children[6].rotation.x += 0.15

  if (cubeCamera) {
    // carModel.scene.visible = false
    // cubeCamera.position.copy(carModel.scene.position)
    // cubeCamera.update(renderer, scene)
    // carModel.scene.visible = true
    // carModel.scene.updateMatrix()
  }

  carModel.scene.traverse((object) => {
    object.updateMatrix()
  })
}

loadCar().then((carScene) => {
  carModel = carScene
  scene.add(carScene.scene)
  init()
})
