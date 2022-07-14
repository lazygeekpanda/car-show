import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { renderer } from "./renderer";
import { scene } from "./scene";
import { camera } from "./camera";

export const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect()));