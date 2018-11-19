import { ComponentType } from 'src/components'
import { uuid } from 'src/utils'
import { AbstractDataObject, DataObject } from './DataObject'

export abstract class Component extends AbstractDataObject {
  // @internal
  uuid: string = uuid()

  // @internal
  readonly type: ComponentType

  constructor(type: ComponentType) {
    super()
    this.type = type
  }
}
