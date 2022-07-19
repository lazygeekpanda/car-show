import { Text } from "troika-three-text"
import { scene } from '../canvas/scene'

import { gui } from '../canvas/gui'

const title = new Text()

const font = "fonts/Ubuntu/Ubuntu-Bold.ttf"

title.font = font
title.text = "CORVETTE C8"
title.fontSize = 0.5
title.color = 0xbc1038

title.position.set(1.1, 0.2, 0.55)
title.rotation.set(-Math.PI / 2,0, Math.PI / 2)

// gui.add(title.position, 'x').min(0).max(2).step(0.01).name("X")

title.anchorX = "center"
title.anchorY = "center"

title.sync()

const subTitle = new Text()
subTitle.font = font
subTitle.fontSize = 0.2
subTitle.color = 0xFCFCFC
subTitle.text = 'CHEVROLET'

subTitle.position.set(0.96, 0.2, 1.5)
subTitle.rotation.set(-Math.PI / 2, 0, Math.PI / 2)

gui.add(subTitle.position, 'x').min(0).max(2).step(0.01).name("X")

// subTitle.rotation.x = Math.PI / 2
// subTitle.rotation.y = Math.PI / 2
// subTitle.rotation.z = -Math.PI / 2

subTitle.anchorX = "center"
subTitle.anchorY = "center"

scene.add(title, subTitle)
