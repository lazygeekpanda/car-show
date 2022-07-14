import * as THREE from "three"

const loadingManager = new THREE.LoadingManager()
export const textureLoader = new THREE.TextureLoader(loadingManager)

loadingManager.onStart = () => console.log("onStart")
loadingManager.onLoad = () => console.log("onLoad")
loadingManager.onProgress = () => console.log("onProgress")
loadingManager.onError = () => console.log("onError")
