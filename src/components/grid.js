import * as THREE from "three"

import { textureLoader } from "../utils/loaders"

const diffuseMap = textureLoader.load("textures/grid-texture.png")

diffuseMap.wrapS = THREE.RepeatWrapping
diffuseMap.wrapT = THREE.RepeatWrapping
diffuseMap.anisotropy = 4
diffuseMap.repeat.set(30, 30)
diffuseMap.offset.set(0, 0)

const geometry = new THREE.PlaneBufferGeometry(35, 35)
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  map: diffuseMap,
  alphaMap: diffuseMap,
  opacity: 0.175,
  transparent: true
})

const grid = new THREE.Mesh(geometry, material)
grid.rotation.x = -Math.PI / 2
grid.position.y = 0.225

export default grid