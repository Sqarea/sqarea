import * as PIXI from 'pixi.js'
import { Engine, InputController } from 'src/core'
import { BoxShape, Transform } from 'src/components'
import { MovementSystem } from 'src/systems'
import { PlayableEntity } from 'src/entities'
import { RenderingSystem } from './systems/RenderingSystem'
import { TransformSystem } from './systems/TransformSystem'

declare const process

const view = document.getElementById('game') as HTMLCanvasElement
const app = new PIXI.Application({ view })
const engine = Engine.GetInstance()

if (process.env.NODE_ENV === 'dev') {
  window['engine'] = engine
}

InputController.GetInstance().startListening()

function init() {
  app.ticker.add(dt => {
    engine.update(dt)
  })
}

const entity = new PlayableEntity()
entity.addComponent(new BoxShape())
entity.addComponent(new Transform())
engine.addSystem(new RenderingSystem(app))
engine.addSystem(new TransformSystem(app))
engine.addSystem(new MovementSystem(entity))
engine.addEntity(entity)

init()
