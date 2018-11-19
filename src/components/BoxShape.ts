import { ShapeComponent } from './ShapeComponent'
import { BOX_SHAPE } from './types'

export class BoxShape extends ShapeComponent {
  x: number
  y: number
  height: number = 100
  width: number = 100

  constructor() {
    super('shape')
  }

  getKind() {
    return BOX_SHAPE
  }
}
