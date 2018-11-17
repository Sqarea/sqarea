import { ShapeComponent, BOX_SHAPE } from '../components'

export class BoxShape extends ShapeComponent {
  x: number
  y: number
  height: number = 1
  width: number = 1

  constructor() {
    super('shape')
    console.log('boxy')
  }

  getKind() {
    return BOX_SHAPE
  }
}
