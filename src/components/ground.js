import * as THREE from "three"

import { textureLoader } from "../utils/loaders"

const normalMap = textureLoader.load("textures/terrain-normal.jpg")
const roughnessMap = textureLoader.load("textures/terrain-roughness.jpg")

const geometry = new THREE.PlaneGeometry(7, 30)
const material = new THREE.MeshPhysicalMaterial({
  // color: 0xffffff,
  color: 0x020202,
  clearcoat: 1,
  clearcoatRoughness: 0.2,

  dithering: true,
  roughness: 0.25,
  metalness: 0.9,
  reflectivity: 1,
  opacity: 0.85,
  transparent: true,
  normalMap,
  normalScale: new THREE.Vector2(0.15, 0.15),
  roughnessMap
})

const ground = new THREE.Mesh(geometry, material)

ground.rotation.x = -Math.PI / 2
ground.position.y = 0.01
ground.receiveShadow = true

export default ground
