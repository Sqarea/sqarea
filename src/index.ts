import * as PIXI from 'pixi.js'
import { Engine } from 'src/core'
import { BoxShape, Transform } from 'src/components'
import { MovementSystem } from 'src/systems'
import { PlayableEntity } from 'src/entities'

const view = document.getElementById('game') as HTMLCanvasElement
const app = new PIXI.Application({ view })
const engine = Engine.getInstance(app)

function init() {
  app.ticker.add(dt => {
    engine.update(dt)
  })
}

const entity = new PlayableEntity()
entity.addComponent(new BoxShape())
entity.addComponent(new Transform())
engine.addSystem(new MovementSystem(entity))
engine.addEntity(entity)

init()
