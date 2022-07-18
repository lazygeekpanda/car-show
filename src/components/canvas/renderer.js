import * as THREE from "three"
import { canvas } from "./canvas"

export const renderer = new THREE.WebGLRenderer({
  canvas,
  powerPreference: "high-performance",
  antialias: false
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearColor(0x222222, 1)
renderer.autoClear = false

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
// renderer.outputEncoding = THREE.sRGBEncoding

renderer.gammaInput = true
renderer.gammaOutput = true
renderer.toneMappingExposure = Math.pow(0.9, 4.0)
