import * as THREE from "three"
import { gui } from "./canvas/gui"
import { textureLoader } from "../utils/loaders"

import { groundSize } from "../config"

const { width: w, height: h, length: l } = groundSize

const normalMap = textureLoader.load("textures/terrain-normal.jpg")
const roughnessMap = textureLoader.load("textures/terrain-roughness.jpg")

const geometry = new THREE.BoxBufferGeometry(w, l, h)
const material = new THREE.MeshPhysicalMaterial({
  color: 0x222,
  clearcoat: 1,
  clearcoatRoughness: 0.5,

  dithering: true,
  roughness: 0.55,
  metalness: 0.5,
  reflectivity: 1,
  opacity: 0.25,
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

const groundFolder = gui.addFolder("Ground")
groundFolder.add(ground.material, "clearcoat", 0, 1)
groundFolder.add(ground.material, "clearcoatRoughness", 0, 1)
groundFolder.add(ground.material, "roughness", 0, 1)
groundFolder.add(ground.material, "metalness", 0, 1)
groundFolder.add(ground.material, "reflectivity", 0, 1)
groundFolder.add(ground.material, "opacity", 0, 1)
// groundFolder.add(ground.material, "emissive")

export default ground
