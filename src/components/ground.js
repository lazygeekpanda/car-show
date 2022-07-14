import * as THREE from "three"
import { renderer } from "./canvas/renderer"
import { FlakesTexture } from "three/examples/jsm/textures/FlakesTexture"

const texture = new THREE.CanvasTexture(new FlakesTexture())

texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping

texture.repeat.x = 10
texture.repeat.y = 10

const geometry = new THREE.PlaneGeometry(30, 30)
const material = new THREE.MeshPhysicalMaterial({
  color: 0x000000,
  clearcoat: 1,
  clearcoatRoughness: 0.2,
  normalMap: texture,
  normalScale: new THREE.Vector2(0.15, 0.15),
  dithering: true,
  roughness: 0.7,
  metalness: 0.9
})

const ground = new THREE.Mesh(geometry, material)

ground.rotation.x = -Math.PI / 2
ground.receiveShadow = true
ground.castShadow = true

export default ground
