import * as THREE from "three"

import { groundSize } from "../config"
const { width: w, length: l } = groundSize

const amount = 6
const count = Math.pow(amount, 2)

const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial()

const instancedBoxMesh = new THREE.InstancedMesh(geometry, material, count)
instancedBoxMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

const dummy = new THREE.Object3D()
const meshProperties = []

for (let i = 0; i < count; i++) {
  const scale = Math.random() ** 2 * 0.5 ** 2 * 2
  const inverse = Math.random() > 0.5
  const xRotationSpeed = Math.random() * 5 * (inverse ? -1 : 1)
  const yRotationSpeed = Math.random() * 5 * (inverse ? -1 : 1)

  const v = new THREE.Vector3(
    Math.random() * 2 - 1,
    (Math.random() * 2.5 - 1) * 0.5 + 0.5,
    (Math.random() * 2 - 1) * (l / 2)
  )

  if (v.x < 0) {
    v.x -= 2.35
  } else {
    v.x = 2.35
  }
  console.log(scale)
  dummy.position.set(...v)
  dummy.scale.set([scale, scale, scale])
  dummy.updateMatrix()
  instancedBoxMesh.setMatrixAt(i, dummy.matrix)

  meshProperties.push({
    scale: [scale, scale, scale],
    position: v,
    xRotationSpeed,
    yRotationSpeed
  })
}
instancedBoxMesh.instanceMatrix.needsUpdate = true
const clock = new THREE.Clock()

export const renderBoxes = () => {
  for (let i = 0; i < count; i++) {
    // const delta = clock.getDelta()
    const { position, scale, xRotationSpeed, yRotationSpeed } = meshProperties[i]

    // dummy.position.set(...position)
    // dummy.scale.set(...scale)
    // dummy.rotation.y += (Math.sin(xRotationSpeed / 4 + delta) / 500 + Math.sin(yRotationSpeed / 4 + delta) / 1000) * (i % 2 === 0 ? -1 : 1)
    // dummy.rotation.z = dummy.rotation.y * 2

    // dummy.updateMatrix()

    // instancedBoxMesh.setMatrixAt(i, dummy.matrix)
  }

  instancedBoxMesh.instanceMatrix.needsUpdate = true
}

export default instancedBoxMesh
