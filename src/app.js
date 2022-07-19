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

// camera.layers.enable(1)

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

const ambientLight = new THREE.AmbientLight(0xffffff, 1.1)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff, 1, 100)

scene.add(ambientLight, directionalLight, pointLight)

const cameraTarget = camera.position.clone()

let cubeCamera, cubeRenderTarget, carModel
let cameraTargetFinished = false

let carParams = {
  color: 0x520804
}

const carFolder = gui.addFolder("Car")
carFolder.open()
carFolder.addColor(carParams, "color").onChange(() => {
  console.log(carParams)
  carModel.scene.traverse((object) => {
    if (object.name === "Main_Chassis_Body_Color_0") {
      // if (object.name === "Object_16") { // Pagani
      // if (object.name === "Material3_10") { // Mclaren
      // if (object.name === "CarBody_1_Car_Paint_0") { // Corvete
      object.material.color = new THREE.Color(carParams.color)
    }
    object.updateMatrix()
  })
})

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
    minFilter: THREE.LinearMipmapLinearFilter
  })
  cubeRenderTarget.texture.type = THREE.HalfFloatType
  cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget)

  scene.add(cubeCamera)

  carModel.scene.visible = false
  cubeCamera.position.copy(carModel.scene.position)
  // cubeCamera.position.set(0, 3, 0)
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
  window.requestAnimationFrame(render)

  // Disabled effects as the performance drops a lot
  // Also autoClear messes up with CubeCamera
  // renderer.autoClear = false
  // renderer.clear()
  // camera.layers.set(1)
  // effectsComposer.render()

  // if (!cameraTargetFinished) {
  //   camera.position.lerp(cameraTarget, 0.01)
  // } else {
  //   cameraTarget.set(1.2 + (cursor.x + cursor.y) * 2, 0.95 + cursor.y * 2, 3.5 - cursor.x * 2)
  //   camera.position.lerp(cameraTarget, 0.01)
  // }

  orbitControls.update()

  renderBoxes()
  renderGrid()
  renderRings()

  // Render scene
  // renderer.clearDepth()
  // camera.layers.set(0)
  renderCar()
  renderer.render(scene, camera)

  stats.update()
}

const renderCar = () => {
  // let group = carModel.scene.children[0].children[0].children[0]
  // group.children[0].rotation.x += 0.15
  // group.children[2].rotation.x += 0.15
  // group.children[4].rotation.x += 0.15
  // group.children[6].rotation.x += 0.15

  carModel.scene.traverse((object) => {
    if (["Front_Right_Wheel", "Front_Left_Wheel", "Rear_Right_Wheel", "Rear_Left_Wheel"].includes(object.name)) {
      object.rotation.x -= 0.075
      // if (object.name === "Object_16") { // Pagani
      // if (object.name === "Material3_10") { // Mclaren
      // if (object.name === "CarBody_1_Car_Paint_0") { // Corvete
    }
    object.updateMatrix()
  })

  if (cubeCamera) {
    // Without visible on/off, performance drops a lot
    carModel.scene.visible = false
    cubeCamera.update(renderer, scene)
    carModel.scene.visible = true
  }
}

loadCar().then((carScene) => {
  carModel = carScene
  scene.add(carScene.scene)
  init()
})
