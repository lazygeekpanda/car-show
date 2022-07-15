import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/examples/js/libs/draco/")
loader.setDRACOLoader(dracoLoader)

export const loadCar = () =>
  new Promise((resolve, reject) => {
    loader.load("models/chevrolet-c7/scene.gltf", (gltf) => {
      gltf.scene.scale.set(0.0035, 0.0035, 0.0035)
      gltf.scene.position.set(0, -0.05, 0)
      gltf.scene.traverse((object) => {
        object.updateMatrix()
        object.matrixAutoUpdate = false
        if (object.isMesh) {
          object.material.envMapIntensity = 40
        }
        object.castShadow = true
        object.receiveShadow = true
      })

      resolve(gltf)
      dracoLoader.dispose()
    })
  })
