import { uuid } from 'src/utils'

export abstract class System {
  // @internal
  uuid: string = uuid()

  abstract update(dt: number)
}
