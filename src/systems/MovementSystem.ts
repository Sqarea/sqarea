import { System, InputController, Key } from 'src/core'
import { PlayableEntity } from 'src/entities/PlayableEntity'
import { Transform } from 'src/components'
import { Constants } from 'src/gameplay'

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
      t.position.x -= Constants.PLAYER_SPEED * dt
    }
    if (this.input.isDown(Key.RIGHT)) {
      t.position.x += Constants.PLAYER_SPEED * dt
    }
    if (this.input.isDown(Key.UP)) {
      t.position.y -= Constants.PLAYER_SPEED * dt
    }
    if (this.input.isDown(Key.DOWN)) {
      t.position.y += Constants.PLAYER_SPEED * dt
    }
  }
}
