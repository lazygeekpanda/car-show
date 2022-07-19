import * as THREE from "three"

import { groundSize } from "../config"
const { width: w, length: l } = groundSize

const amount = 6
const count = Math.pow(amount, 2)

const geometry = new THREE.BoxBufferGeometry(0.75, 0.75, 0.75)
const material = new THREE.MeshBasicMaterial({
  metalness: 0.7,
  roughness: 0.1,
})

const instancedBoxMesh = new THREE.InstancedMesh(geometry, material, count)
instancedBoxMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

const dummy = new THREE.Object3D()
const matrix = new THREE.Matrix4()
const meshProperties = []

for (let i = 0; i < count; i++) {
  const scale = Math.pow(Math.random(), 2.0) * 0.5 + 0.05
  const inverse = Math.random() > 0.5
  const xRotationSpeed = Math.random() * 5 * (inverse ? -1 : 1)
  const yRotationSpeed = Math.random() * 5 * (inverse ? -1 : 1)

  const v = new THREE.Vector3(
    Math.random() * 2 - 1,
    (Math.random() * 2.5 - 1) * 0.5 + 0.5,
    (Math.random() * 2 - 1) * (l / 3)
  )

  if (v.x < 0) {
    v.x -= 1.85
  } else {
    v.x = 1.85
  }

  if (v.y < 0.5) {
    v.y = 0.95
  }

  dummy.position.set(...v)
  dummy.scale.set(scale, scale, scale)
  dummy.updateMatrix()

  instancedBoxMesh.setMatrixAt(i, dummy.matrix)
  instancedBoxMesh.setColorAt(i, new THREE.Color(i % 2 ? 0x171927 : 0x843B62))
  // instancedBoxMesh.setColorAt(i, new THREE.Color(...(i % 2 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4])))
  instancedBoxMesh.instanceMatrix.needsUpdate = true

  instancedBoxMesh.castShadow = true
  instancedBoxMesh.receiveShadow = true

  meshProperties.push({
    xRotationSpeed,
    yRotationSpeed
  })
}
instancedBoxMesh.instanceMatrix.needsUpdate = true
const clock = new THREE.Clock()

export const renderBoxes = () => {
  for (let i = 0; i < count; i++) {
    let t = clock.getElapsedTime();
    const { xRotationSpeed, yRotationSpeed } = meshProperties[i]

    instancedBoxMesh.getMatrixAt(i, matrix)
    matrix.decompose(dummy.position, dummy.quaternion, dummy.scale)

    dummy.rotation.set(
      Math.cos(xRotationSpeed + t * Math.sign(xRotationSpeed)) * Math.PI * 0.0525,
      Math.sin(yRotationSpeed + t * Math.sign(yRotationSpeed)) * Math.PI * 0.0525,
      0
    )

    // dummy.position.z += Math.sin(delta) * 1
    dummy.position.y += Math.sin(t * xRotationSpeed * yRotationSpeed) / 1000

    dummy.updateMatrix()

    instancedBoxMesh.setMatrixAt(i, dummy.matrix)
    instancedBoxMesh.instanceMatrix.needsUpdate = true
  }
}

export default instancedBoxMesh
