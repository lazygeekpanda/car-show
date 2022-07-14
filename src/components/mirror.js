import * as THREE from "three"
import { Reflector } from "three/examples/jsm/objects/Reflector"

const geometry = new THREE.PlaneGeometry(7, 30)

const mirror = new Reflector(geometry, {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  color: 0x777777,
  multisample: 256,
})

mirror.rotation.x = -Math.PI / 2

export default mirror
