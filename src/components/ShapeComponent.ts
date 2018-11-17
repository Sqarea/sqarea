import { Component } from '../core'
import { ShapeKind } from '../components'

export abstract class ShapeComponent extends Component {
  abstract getKind(): ShapeKind
}
