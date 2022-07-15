import * as THREE from "three"

export const pointLight = new THREE.PointLight("#fff", 0.25)
pointLight.position.set(0, 100, 0)
pointLight.lookAt(0, 0, 0)

