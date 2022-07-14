import * as THREE from "three"

import { gui } from './gui'

export const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.x = 3
camera.position.y = 2
camera.position.z = 5
const cameraFolder = gui.addFolder('Camera')

cameraFolder.add(camera.position, 'x').min(-100).max(100).step(0.01).name("X")
cameraFolder.add(camera.position, 'y').min(-100).max(100).step(0.01).name("Y")
cameraFolder.add(camera.position, 'z').min(-100).max(100).step(0.01).name("Z")