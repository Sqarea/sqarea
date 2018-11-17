import { ComponentType } from '../components/types'
import { uuid } from '../utils'

export abstract class Component {
  // @internal
  uuid: string = uuid()

  // @internal
  type: ComponentType

  constructor(type: ComponentType) {
    this.type = type
  }
}
