import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { canvas } from './canvas'
import { camera } from './camera'

export const orbitControls = new OrbitControls(camera, canvas)
orbitControls.enableDamping = true

orbitControls.minDistance = 4
orbitControls.maxDistance = 10
