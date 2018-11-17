import * as PIXI from 'pixi.js'
import { Engine } from 'src/core'

const view = document.getElementById('game') as HTMLCanvasElement
const app = new PIXI.Application({ view })

function init() {
  const engine = new Engine()

  app.ticker.add(dt => {
    engine.update(dt)
  })
}

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
