import * as THREE from "three"

import { pointer } from "./utils/cursor"

import { scene } from "./components/canvas/scene"
import { camera } from "./components/canvas/camera"
import { renderer } from "./components/canvas/renderer"
import { orbitControls } from "./components/canvas/orbitControls"
import lights from "./components/canvas/lights"
import { stats } from "./components/canvas/stats"

import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
			import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// Components
import mirror from "./components/mirror"
import ground from "./components/ground"
import { loadCar } from "./components/car"
import grid, { renderGrid } from "./components/grid"
import boxes, { renderBoxes } from "./components/boxes"
import rings, { renderRings } from "./components/rings"

// Texts
import "./components/texts/title"

import "./utils/resize"
import { gui } from "./components/canvas/gui"

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
const reactAreaLight = new THREE.RectAreaLight(0xffffff, 7, 4, 7)
reactAreaLight.position.set(0, 4, 0)
reactAreaLight.rotation.set(-Math.PI / 2, 0, 0)
reactAreaLight.lookAt(0, 0, 0)
scene.add(ambientLight, directionalLight, reactAreaLight)

// scene.add( new RectAreaLightHelper( reactAreaLight ) );

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
  cameraTarget.set(1.2, 2, 4.5)

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
const render = () => {
  window.requestAnimationFrame(render)

  if (!cameraTargetFinished) {
    camera.position.lerp(cameraTarget, 0.015)
  }

  orbitControls.update()

  renderBoxes()
  renderGrid()
  renderRings()
  renderCar()

  renderer.render(scene, camera)
  stats.update()
}

const renderCar = () => {
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
