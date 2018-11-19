import { ComponentType } from 'src/components'
import { uuid } from 'src/utils'
import { AbstractDataObject, DataObject } from './DataObject'

export abstract class Component extends AbstractDataObject {
  // @internal
  @DataObject.readonly
  uuid: string = uuid()

  // @internal
  readonly type: ComponentType

  private _type: ComponentType

  constructor(type: ComponentType) {
    super()
    this._type = type

    Object.defineProperty(this, 'type', {
      get() {
        return this._type
      },
      set() {
        throw new Error('Property "type" is readonly')
      }
    })
  }
}
