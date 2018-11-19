import { ComponentType } from 'src/components'
import { uuid } from 'src/utils'

export abstract class Component {
  // @internal
  uuid: string = uuid()

  // @internal
  type: ComponentType

  constructor(type: ComponentType) {
    this.type = type
  }
}
