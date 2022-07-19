import { Text } from "troika-three-text"
import { scene } from '../canvas/scene'

const title = new Text()


const font = "fonts/Ubuntu/Ubuntu-Bold.ttf"

title.font = font
title.text = "CORVETTE C8"
title.fontSize = 0.75
title.color = 0xbc1038
title.position.y = 2
title.position.z = -4

// title.rotation.x = -Math.PI / 2
// title.position.x = -2
title.anchorX = "center"
title.anchorY = "center"

title.sync()

const subTitle = new Text()
subTitle.font = font
subTitle.fontSize = 0.15
subTitle.color = 0xFCFCFC
subTitle.text = 'CHEVROLET'

subTitle.position.y = 2.15
subTitle.position.z = -4

subTitle.anchorX = "center"
subTitle.anchorY = "center"

scene.add(title, subTitle)
