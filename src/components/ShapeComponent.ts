import { ComponentAttributes } from 'src/core/Component'
import { ShapeKind } from './types'
import { InternalComponent } from './InternalComponent'

export abstract class ShapeComponent<T extends ComponentAttributes> extends InternalComponent<T> {
  abstract getKind(): ShapeKind
}
