import * as THREE from "three"

const lights = []

/**
 * ----------------------
 * Teal Spot Light
 * ----------------------
 */
const tealSpotLight = new THREE.SpotLight(0x2dd4bf, 0.5)

tealSpotLight.castShadow = true
tealSpotLight.position.set(7, 1, -10)
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


/**
 * ----------------------
 * Rose Spot Light
 * ----------------------
 */
const roseSpotLight = new THREE.SpotLight(0xf43f5e, 5)

roseSpotLight.castShadow = true
roseSpotLight.position.set(-25, 5, 0)
roseSpotLight.angle = -0.4
roseSpotLight.penumbra = 0.5
// roseSpotLight.decay = 0.5
roseSpotLight.distance = 80

roseSpotLight.shadow.mapSize.width = 256
roseSpotLight.shadow.mapSize.height = 256
roseSpotLight.shadow.camera.near = 10
roseSpotLight.shadow.camera.far = 400
roseSpotLight.shadow.focus = 1

lights.push(roseSpotLight)

export default [...lights]
