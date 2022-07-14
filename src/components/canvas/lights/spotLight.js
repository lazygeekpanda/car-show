import * as THREE from "three"

import { gui } from '../gui'

const lights = []

/**
 * ----------------------
 * Teal Spot Light
 * ----------------------
 */
const tealSpotLight = new THREE.SpotLight(0x2dd4bf, 1.5)

tealSpotLight.castShadow = true
tealSpotLight.position.set(25, 5, -20)
tealSpotLight.angle = 0.6
tealSpotLight.penumbra = 1
// tealSpotLight.decay = 8
// tealSpotLight.distance = 100

tealSpotLight.shadow.mapSize.width = 256
tealSpotLight.shadow.mapSize.height = 256
tealSpotLight.shadow.camera.near = 10
tealSpotLight.shadow.camera.far = 400
tealSpotLight.shadow.focus = 1

lights.push(tealSpotLight)

const tealSpotLightGroup = gui.addFolder('Teal Spot Light')

tealSpotLightGroup.add(tealSpotLight, 'intensity').min(0).max(100).step(0.01).name("Intensity")
tealSpotLightGroup.add(tealSpotLight.position, 'x').min(-100).max(100).step(0.01).name("X")
tealSpotLightGroup.add(tealSpotLight.position, 'y').min(-100).max(100).step(0.01).name("Y")
tealSpotLightGroup.add(tealSpotLight.position, 'z').min(-100).max(100).step(0.01).name("Z")
tealSpotLightGroup.add(tealSpotLight, 'angle').min(-Math.PI).max(Math.PI).step(0.001).name("Angle")
tealSpotLightGroup.add(tealSpotLight, 'penumbra').min(0).max(1).step(0.001).name("Penumbra")
tealSpotLightGroup.add(tealSpotLight, 'decay').min(0).max(10).step(0.01).name("Decay")
tealSpotLightGroup.add(tealSpotLight, 'distance').min(0).max(1000).step(1).name("Distance")


/**
 * ----------------------
 * Rose Spot Light
 * ----------------------
 */
const roseSpotLight = new THREE.SpotLight(0xf43f5e, 25)

roseSpotLight.castShadow = true
roseSpotLight.position.set(-25, 5, 0)
roseSpotLight.angle = -0.4
roseSpotLight.penumbra = 0.5
// roseSpotLight.decay = 0.5
// roseSpotLight.distance = 500

roseSpotLight.shadow.mapSize.width = 256
roseSpotLight.shadow.mapSize.height = 256
roseSpotLight.shadow.camera.near = 10
roseSpotLight.shadow.camera.far = 400
roseSpotLight.shadow.focus = 1

lights.push(roseSpotLight)

const roseSpotLightGroup = gui.addFolder('Rose Spot Light')

roseSpotLightGroup.add(roseSpotLight, 'intensity').min(0).max(100).step(0.01).name("Intensity")
roseSpotLightGroup.add(roseSpotLight.position, 'x').min(-100).max(100).step(0.01).name("X")
roseSpotLightGroup.add(roseSpotLight.position, 'y').min(-100).max(100).step(0.01).name("Y")
roseSpotLightGroup.add(roseSpotLight.position, 'z').min(-100).max(100).step(0.01).name("Z")
roseSpotLightGroup.add(roseSpotLight, 'angle').min(-Math.PI).max(Math.PI).step(0.001).name("Angle")
roseSpotLightGroup.add(roseSpotLight, 'penumbra').min(0).max(1).step(0.001).name("Penumbra")
roseSpotLightGroup.add(roseSpotLight, 'decay').min(0).max(10).step(0.01).name("Decay")
roseSpotLightGroup.add(roseSpotLight, 'distance').min(0).max(1000).step(1).name("Distance")

/**
 * ----------------------
 * Helpers
 * ----------------------
 */
const helpers = []

// helpers.push(new THREE.SpotLightHelper(tealSpotLight))
// helpers.push(new THREE.SpotLightHelper(roseSpotLight))

export default [...lights, ...helpers]
