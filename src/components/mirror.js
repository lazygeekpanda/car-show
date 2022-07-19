import * as THREE from "three"
import { Reflector } from "three/examples/jsm/objects/Reflector"

const geometry = new THREE.PlaneGeometry(8, 30)

const mirror = new Reflector(geometry, {
  clipBias: 0.03,
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
  color: 0x222,
  multisample: 256,
  encoding: THREE.sRGBEncoding
})

mirror.rotation.x = -Math.PI / 2
mirror.position.y = 0.1

export default mirror
