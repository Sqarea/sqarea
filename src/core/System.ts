import { uuid } from 'src/utils'
import { Engine } from './Engine'

export abstract class System {
  // @internal
  uuid: string = uuid()

  engine: Engine

  systemDidMount() {
    // stub
  }

  abstract update(dt: number)
}
