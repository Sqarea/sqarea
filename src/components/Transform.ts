import * as PIXI from 'pixi.js'
import { Component } from 'src/core/Component'
import { DataObject } from 'src/core/DataObject'

export class Transform extends Component {
  @DataObject.field
  position: PIXI.Point = new PIXI.Point(0, 0)

  @DataObject.field
  rotation: number = 0

  @DataObject.field
  scale: PIXI.Point = new PIXI.Point(1, 1)

  constructor() {
    super('transform')
  }
}
