import * as THREE from "three"
import { canvas } from "./canvas"

export const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.autoClear = false
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ACESFilmicToneMapping

renderer.gammaInput = true
renderer.gammaOutput = true
renderer.toneMappingExposure = 1.1
// renderer.toneMappingExposure = Math.pow(0.9, 4.0)
