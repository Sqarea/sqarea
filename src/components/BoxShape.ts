import { ShapeComponent, BOX_SHAPE } from 'src/components'

export class BoxShape extends ShapeComponent {
  x: number
  y: number
  height: number = 1
  width: number = 1

  getKind() {
    return BOX_SHAPE
  }
}
