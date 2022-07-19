import * as THREE from "three"

import { gui } from './gui'
import { scene } from "./scene"
import { camera } from "./camera"
import { renderer } from "./renderer"

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js"
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js"

const renderScene = new RenderPass(scene, camera)

const effectFXAA = new ShaderPass(FXAAShader)
effectFXAA.uniforms.resolution.value.set(0.25 / window.innerWidth, 0.25 / window.innerHeight)

const unrealBloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
  1.5,
  0.4,
  0.85
)
unrealBloomPass.threshold = 0
unrealBloomPass.strength = 1
unrealBloomPass.radius = 0.15
unrealBloomPass.renderToScreen = false

const ssaaRenderPass = new SSAARenderPass(scene, camera)
ssaaRenderPass.sampleLevel = 1

const copyPass =new ShaderPass(CopyShader)

const effectsFolder = gui.addFolder("Effects")

effectsFolder.add(unrealBloomPass, "threshold", 0.0, 1.0).name("Threshold")
effectsFolder.add(unrealBloomPass, "strength", 0.0, 10.0).name("Strength")
effectsFolder.add(unrealBloomPass, "radius", 0.0, 1.0).name("Radius")

const composer = new EffectComposer(renderer)
composer.setSize(window.innerWidth, window.innerHeight)
composer.setPixelRatio(1)

composer.addPass(renderScene)
composer.addPass(effectFXAA)
composer.addPass(ssaaRenderPass)
composer.addPass(copyPass)
composer.addPass(unrealBloomPass)

export default composer
