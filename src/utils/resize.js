import { camera } from '../components/canvas/camera'
import { renderer } from '../components/canvas/renderer'


window.addEventListener("resize", () => {
  // Update sizes
  const w = window.innerWidth;
  const h = window.innerHeight;

  // Update camera
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});