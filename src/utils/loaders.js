import * as THREE from "three"

const loadingManager = new THREE.LoadingManager()
export const textureLoader = new THREE.TextureLoader(loadingManager)

// loadingManager.onStart = () => console.log("onStart")
// loadingManager.onLoad = () => console.log("onLoad")
// loadingManager.onProgress = (url, loaded, total) => console.log("onProgress", url, loaded, total)
// loadingManager.onError = () => console.log("onError")
