import * as THREE from "three"

import { gui } from './gui'

export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.x = 10
camera.position.y = 3
// camera.position.y = 0.95
camera.position.z = 9

const cameraFolder = gui.addFolder('Camera')

cameraFolder.add(camera.position, 'x').min(-100).max(100).step(0.01).name("X")
cameraFolder.add(camera.position, 'y').min(-100).max(100).step(0.01).name("Y")
cameraFolder.add(camera.position, 'z').min(-100).max(100).step(0.01).name("Z")