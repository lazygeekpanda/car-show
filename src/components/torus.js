import * as THREE from "three"

const TORUS_COUNT = 8
const colors = [0x14b8a6, 0xd946ef]

const list = []

const materialOptions = {
  color: 0x000000,
  emissiveIntensity: 0.5,
}

const geometry = new THREE.TorusGeometry(3.35, 0.04, 16, 100, Math.PI)
const violetMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: 0x14b8a6,
})
const tealMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: 0xd946ef
})

const arr = [...Array(TORUS_COUNT).keys()]

for (let i = 0; i < arr.length; i++) {
  const torus = new THREE.Mesh(geometry, i % 2 === 0 ? violetMaterial : tealMaterial)
  const z = (i - Math.floor(TORUS_COUNT / 2)) * 3.5
  torus.position.z = z

  let dist = Math.abs(z)
  torus.scale.set(1 - dist * 0.06, 1 - dist * 0.06, 1 - dist * 0.06)

  let colorScale = 1
  if (dist > 2 ) {
    colorScale = 1 - (Math.min(dist, 12) - 2) / 10
  }
  colorScale *= 0.5

  // torus.material.emissive = new THREE.Color(colors[i % 2]).multiplyScalar(colorScale)

  torus.receiveShadow = true
  torus.castShadow = true
  list.push(torus)
}


export default list
