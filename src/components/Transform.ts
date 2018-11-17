import * as PIXI from 'pixi.js'
import { Component } from 'src/core'

export class Transform extends Component {
  position: PIXI.Point = new PIXI.Point(0, 0)
  rotation: number = 0
  scale: PIXI.Point = new PIXI.Point(0, 0)
}
