import { uuid } from '../utils'

export abstract class System {
  // @internal
  uuid: string = uuid()

  abstract update(dt: number)
}
