import * as THREE from "three"
import { Reflector } from "three/examples/jsm/objects/Reflector"

const geometry = new THREE.PlaneGeometry(7, 30)

const mirror = new Reflector(geometry, {
  clipBias: 0.03,
  textureWidth: window.innerWidth / 2,
  textureHeight: window.innerHeight / 2,
  color: 0x222222,
  multisample: 64,
})

mirror.rotation.x = -Math.PI / 2

export default mirror
