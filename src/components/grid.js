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
  color: 0xA833B9,
  side: THREE.DoubleSide,
  map: diffuseMap,
  alphaMap: diffuseMap,
  opacity: 1,
  transparent: true
})

const grid = new THREE.Mesh(geometry, material)
grid.rotation.x = -Math.PI / 2
grid.position.y = 0.05

const clock = new THREE.Clock()

export const renderGrid = () => {
  let t = -clock.getElapsedTime() * 0.5
  diffuseMap.offset.set(0, t)
}

export default grid
