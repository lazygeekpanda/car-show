import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

// import { scene, cubeRenderTarget } from "./canvas/scene"

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/examples/js/libs/draco/")
loader.setDRACOLoader(dracoLoader)

export const loadCar = () => new Promise((resolve, reject) => {
  loader.load("models/chevrolet-c7/scene.gltf", (gltf) => {
    // scene.add(gltf.scene)

    gltf.scene.scale.set(0.005, 0.005, 0.005)
    gltf.scene.position.set(0, -0.05, 0)
    gltf.scene.traverse((object) => {
      if (object.isMesh) {
        object.material.envMapIntensity = 20
        // object.material.envMap = cubeRenderTarget.texture
        object.material.reflectivity = 0.8
        object.material.combine = THREE.MultiplyOperation
      }
      object.castShadow = true
      object.receiveShadow = true

      resolve(gltf)
    })
  })
})
