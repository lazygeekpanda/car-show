import * as THREE from "three"
import { textureLoader } from "../utils/loaders"

import { groundSize } from "../config"

const { width: w, height: h, length: l } = groundSize

const normalMap = textureLoader.load("textures/terrain-normal.jpg")
const roughnessMap = textureLoader.load("textures/terrain-roughness.jpg")

normalMap.wrapS = THREE.RepeatWrapping
normalMap.wrapT = THREE.RepeatWrapping
normalMap.repeat.set(5, 5)
normalMap.offset.set(0, 0)

roughnessMap.wrapS = THREE.RepeatWrapping
roughnessMap.wrapT = THREE.RepeatWrapping
roughnessMap.repeat.set(5, 5)
roughnessMap.offset.set(0, 0)

const geometry = new THREE.BoxBufferGeometry(w, l, h)
const material = new THREE.MeshPhysicalMaterial({
  color: 0xe0031,
  clearcoat: 1,
  clearcoatRoughness: 0.5,

  dithering: true,
  roughness: 0.55,
  metalness: 0.5,
  reflectivity: 1,
  opacity: 0.35,
  transparent: true,
  normalMap,
  normalScale: new THREE.Vector2(0.15, 0.15),
  roughnessMap
})

const ground = new THREE.Mesh(geometry, material)

ground.rotation.x = -Math.PI / 2
ground.position.y = -h / 2
ground.castShadow = true
ground.receiveShadow = true

export default ground
