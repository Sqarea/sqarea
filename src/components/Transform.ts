import * as PIXI from 'pixi.js'
import { Component } from '../core/Component'

export class Transform extends Component {
  position: PIXI.Point = new PIXI.Point(50, 50)
  rotation: number = 0
  scale: PIXI.Point = new PIXI.Point(1, 1)

  constructor() {
    super('transform')
  }
}
