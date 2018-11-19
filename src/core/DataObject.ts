export abstract class AbstractDataObject {
  // @internal
  isDirty: boolean = false

  // @internal
  data: any = {}
}

export namespace DataObject {
  /**
   * Creates a proxy that marks the object as dirty whenever this property is modified
   */
  export function field(target: AbstractDataObject, propertyKey: string) {
    if (delete (target as any)[propertyKey]) {
      Object.defineProperty(target, propertyKey.toString(), {
        get: function(this: AbstractDataObject) {
          return this.data[propertyKey]
        },
        set: function(this: AbstractDataObject, value: any) {
          DataObject.setValue(this, propertyKey, value)
        },
        enumerable: true
      })
    }
  }

  /**
   * Creates a proxy that forces this property to be read-only at runtime
   */
  export function readonly(target: AbstractDataObject, propertyKey: string) {
    if (delete (target as any)[propertyKey]) {
      Object.defineProperty(target, propertyKey.toString(), {
        get: function(this: AbstractDataObject) {
          if (this.data && propertyKey in this.data === false) {
            throw new Error(`Property "${propertyKey}" is uninitialized`)
          }
          return this.data[propertyKey]
        },
        set: function(this: AbstractDataObject, value: any) {
          if (this.data && propertyKey in this.data) {
            throw new Error(`Property "${propertyKey}" is readonly`)
          }

          DataObject.setValue(this, propertyKey, value)
        },
        enumerable: true,
        configurable: false
      })
    }
  }

  export function setValue(target: AbstractDataObject, key: string, value: any) {
    if (!this.data) {
      // hack for property initializers
      this.data = {}
    }

    if (typeof value === 'object') {
      let self = target
      target.data[key] = new Proxy(value, {
        set(target, property, val) {
          self.isDirty = true
          target[property] = val
          target.isDirty = true
          return true
        }
      })
    } else if (target.data[key] !== value) {
      target.data[key] = value
      target.isDirty = true
    }
  }
}
