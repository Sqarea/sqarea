import { Component } from 'src/core'
import { ShapeKind } from 'src/components'

export abstract class ShapeComponent extends Component {
  abstract getKind(): ShapeKind
}
