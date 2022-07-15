import * as THREE from "three"

const TORUS_COUNT = 8

const list = []

const materialOptions = {
  color: 0x000000,
  emissiveIntensity: 1,
}

const geometry = new THREE.TorusGeometry(3.35, 0.04, 16, 100, Math.PI)
const violetMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: 0xFB3640,
})
const tealMaterial = new THREE.MeshStandardMaterial({
  ...materialOptions,
  emissive: 0x3D0185
})

const arr = [...Array(TORUS_COUNT).keys()]

for (let i = 0; i < arr.length; i++) {
  const torus = new THREE.Mesh(geometry, i % 2 === 0 ? violetMaterial : tealMaterial)
  const z = (i - Math.floor(TORUS_COUNT / 2)) * 3.5
  torus.position.z = z

  let dist = Math.abs(z)
  torus.scale.set(1 - dist * 0.06, 1 - dist * 0.06, 1 - dist * 0.06)

  torus.receiveShadow = true
  torus.castShadow = true
  torus.layers.enable(1)
  list.push(torus)
}


export default list
