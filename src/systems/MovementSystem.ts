import { System } from '../core/System'
import { InputController, Key } from '../core/InputController'
import { PlayableEntity } from '../entities/PlayableEntity'
import { Transform } from '../components/Transform'

export class MovementSystem extends System {
  private entity: PlayableEntity
  private input: InputController = InputController.getInstance()

  constructor(e: PlayableEntity) {
    super()
    this.entity = e
  }

  update(dt: number) {
    const t = this.entity.getComponent<Transform>('transform')
    if (this.input.isDown(Key.LEFT)) {
      t.position.x -= 5
    }
    if (this.input.isDown(Key.RIGHT)) {
      t.position.x += 5
    }
    if (this.input.isDown(Key.UP)) {
      t.position.y -= 5
    }
    if (this.input.isDown(Key.DOWN)) {
      t.position.y += 5
    }
  }
}
