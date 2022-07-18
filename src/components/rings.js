import * as THREE from "three"

const RING_COUNT = 14

const list = []

const materialOptions = {
  color: 0x000000,
  emissiveIntensity: 1
}

const geometry = new THREE.TorusGeometry(3.35, 0.04, 16, 100, Math.PI)
const violetMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: new THREE.Color(6, 0.15, 0.7)
})
const tealMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: new THREE.Color(0.1, 0.7, 3)
})

const arr = [...Array(RING_COUNT).keys()]

for (let i = 0; i < arr.length; i++) {
  const ring = new THREE.Mesh(geometry, i % 2 === 0 ? violetMaterial : tealMaterial)
  const z = (i - Math.floor(RING_COUNT / 2)) * 3.5
  ring.position.z = z

  let dist = Math.abs(z)
  ring.scale.set(1 - dist * 0.06, 1 - dist * 0.06, 1 - dist * 0.06)

  let colorScale = 1
  if (dist > 2) {
    colorScale = 1 - (Math.min(dist, 12) - 2) / 100
  }
  colorScale *= 0.5

  if (i % 2 == 1) {
    ring.material.emissive = new THREE.Color(6, 0.15, 0.7).multiplyScalar(colorScale)
  } else {
    ring.material.emissive = new THREE.Color(0.1, 0.7, 3).multiplyScalar(colorScale)
  }

  ring.receiveShadow = true
  ring.castShadow = true
  ring.layers.enable(1)
  list.push(ring)
}

const clock = new THREE.Clock()

export const renderRings = () => {
  const elapsed = clock.getElapsedTime()

  for (let i = 0; i < list.length; i++) {
    const mesh = list[i]
    let z = (i - list.length / 2) * 3.5 + ((elapsed * 0.4) % 3.5) * 2

    let dist = Math.abs(z)
    mesh.position.set(0, 0, -z)
    mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04)
  }
}

export default list
