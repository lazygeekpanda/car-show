import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("/examples/js/libs/draco/")
loader.setDRACOLoader(dracoLoader)
// loader.preload()

export const loadCar = () =>
  new Promise((resolve, reject) => {
    loader.load(
      "models/chevrolet-c7/scene.gltf",
      (gltf) => {
        gltf.scene.scale.set(0.005, 0.005, 0.005)
        gltf.scene.position.set(0, -0.05, 0)
        gltf.scene.traverse((object) => {
          if (object.isMesh) {
            console.log(object.name, object.userData)
            object.material.envMapIntensity = 20
            object.material.reflectivity = 0.5
            object.castShadow = true
            object.receiveShadow = true
          }
        })

        resolve(gltf)
        dracoLoader.dispose()
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      (err) => {
        console.error("Error loading model", err)
      }
    )
  })
