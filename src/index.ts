import * as PIXI from 'pixi.js'
import { engine, Entity } from './core'
import { BoxShape, Transform } from './components'

const view = document.getElementById('game') as HTMLCanvasElement
const app = new PIXI.Application({ view })

function init() {
  app.ticker.add(dt => {
    engine.update(dt)
  })
}

const entity = new Entity()
entity.addComponent(new BoxShape())
entity.addComponent(new Transform())
engine.addEntity(entity)

init()

/**
 * class PlayableEntity extends Component {
 *  health: number = 100
 * }
 *
 * class MovementSystem extends System {
 *
 *  update(dt: number) {
 *    for (let i = 0 ....) {
 *      const entity = playableEnts[i]
 *      const t = entity.get(Transform)
 *
 *      if (Input.state.ARROW_UP) {
 *        t.position.y += dt * 0.5
 *      }
 *    }
 *  }
 *
 * }
 *
 *
 * const a = new Entity()
 *
 * a.set(new Transform())
 * a.set(new BoxShape())
 * a.set(new PlayableEntity())
 *
 * engine.addEntity(a)
 * engine.addSystem(new MovementSystem())
 *
 *
 *
 *
 */
