import { uuid } from 'src/utils'
import { ComponentType } from 'src/components/ComponentType'

export abstract class Component {
  // @internal
  uuid: string = uuid()

  // @internal
  type: ComponentType

  constructor(type: ComponentType) {
    this.type = type
  }
}
