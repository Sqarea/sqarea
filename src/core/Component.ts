import { ComponentType } from 'src/components'
import { uuid } from 'src/utils'

export type ComponentAttributes = Record<string, string | number | { serialize(): string }>

export abstract class Component<T extends ComponentAttributes> {
  // @internal
  uuid: string = uuid()

  // @internal
  readonly type: ComponentType

  // @internal
  protected readonly _attributes: T = {} as any

  // @internal
  private _isDirty: boolean = true

  // @internal
  private cache: Record<string, string> = {}

  attributes: T

  constructor(type: ComponentType, attributes: T) {
    this.type = type
    this._attributes = attributes
    this.attributes = new Proxy(this._attributes, {
      get(target: T, prop: string, c) {
        return target[prop]
      },
      set(target: T, prop: string, value: any) {
        target[prop] = value
        this.isDirty = true
        return true
      }
    })
  }

  set isDirty(flag: boolean) {
    // TODO (telemetry): track dirty flags
    this._isDirty = flag
  }

  get isDirty() {
    // Dirty until set otherwise
    if (this._isDirty) return true

    // Lazy: check nested structures
    for (let key in this._attributes) {
      const field = this._attributes[key]
      const fieldType = typeof field

      // Scalar types will mark the component as dirty when individually set
      if (fieldType !== 'number' && fieldType !== 'string' && field !== null) {
        if ('serialize' in field) {
          // TODO: are strings the best serialization solution?
          const val = (field as any).serialize()
          const oldCache = this.cache[key]

          // Track changes in cache
          this.cache[key] = val

          // Fast return once a dirty member is found
          if (oldCache && oldCache !== val) {
            this._isDirty = true
            return true
          }
        } else {
          throw new Error(`Component "${this.uuid}" (${this.type}) contains an unsupported data structure of type "${typeof field}"`)
        }
      }
    }
  }

  reset() {
    this.isDirty = false
    this.cache = {}
  }
}
