import { ambientLight } from "./ambientLight"
import { pointLight } from "./pointLight"
import spotLights from "./spotLight"

export default [ambientLight, pointLight, ...spotLights]
