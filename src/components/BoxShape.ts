import { ShapeComponent } from './ShapeComponent'
import { BOX_SHAPE } from './types'
import { DataObject } from 'src/core/DataObject'

export class BoxShape extends ShapeComponent {
  @DataObject.field
  x: number

  @DataObject.field
  y: number

  @DataObject.field
  height: number = 100

  @DataObject.field
  width: number = 100

  constructor() {
    super('shape')
  }

  getKind() {
    return BOX_SHAPE
  }
}
