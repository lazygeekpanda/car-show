import * as THREE from "three"

export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
camera.position.x = 10
camera.position.y = 5
camera.position.z = 7

camera.lookAt(0, 0, 0)