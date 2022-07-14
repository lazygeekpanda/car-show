import * as THREE from "three"
import { gui } from './components/canvas/gui'

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { LuminosityHighPassShader } from "three/examples/jsm/shaders/LuminosityHighPassShader.js"

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
import "./components/car"
import torus from "./components/torus"

import "./utils/resize"

camera.layers.enable(1)

/**
 * ----------------------
 * Scene
 * ----------------------
 */
torus.forEach(t => {
  t.layers.enable(1)
  scene.add(t)
})
scene.add(camera, ...lights)
scene.add(ground, mirror)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)

scene.add(ambientLight, directionalLight)

const renderScene = new RenderPass(scene, camera)

const effectFXAA = new ShaderPass(FXAAShader)
effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)

const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
unrealBloomPass.threshold = 0
unrealBloomPass.strength = 2.25
unrealBloomPass.radius = 0.35
unrealBloomPass.renderToScreen = true

const effectsFolder = gui.addFolder('Effects')
effectsFolder.add(unrealBloomPass, 'threshold', 0.0, 1.0).name('Threshold')
effectsFolder.add(unrealBloomPass, 'strength', 0.0, 10.0).name('Strength')
effectsFolder.add(unrealBloomPass, 'radius', 0.0, 1.0).name('Radius')

const composer = new EffectComposer(renderer)
composer.setSize(window.innerWidth, window.innerHeight)

composer.addPass(renderScene)
composer.addPass(effectFXAA)
composer.addPass(unrealBloomPass)

const cameraTarget = camera.position.clone()
setTimeout(() => {
  initAnimations()
}, 2000)

const initAnimations = () => {
  cameraTarget.set(1.5, 0.95, 5.5)
}

/**
 * ----------------------
 * Animations
 * ----------------------
 */
const clock = new THREE.Clock()
const tick = () => {
  window.requestAnimationFrame(tick)
  stats.begin()

  renderer.autoClear = false
  renderer.clear()

  camera.layers.set(1)
  composer.render()

  camera.position.lerp(cameraTarget, 0.015);

  orbitControls.update()

  // Render scene
  renderer.clearDepth()
  camera.layers.set(0)
  renderer.render(scene, camera)
  stats.end()
}

tick()
