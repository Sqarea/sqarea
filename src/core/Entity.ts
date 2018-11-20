import { Component } from './Component'
import { ComponentType } from 'src/components/types'
import { uuid } from 'src/utils'
import { Engine } from './Engine'

export class Entity {
  // @internal
  readonly uuid: string = uuid()

  // @internal
  engine: Engine

  // @internal
  engineId: string

  // @internal
  components: Record<string, Component> = {}

  children: Entity[] = []

  private _parent: Entity | null = null

  set parent(entity: Entity | null) {
    if (entity === null) {
      this._parent = null
    } else {
      entity.addChild(this)
    }
  }

  get parent() {
    return this._parent
  }

  addComponent(component: Component) {
    this.components[component.type] = component
    return this
  }

  removeComponent(type: ComponentType) {
    delete this.components[type]
    return this
  }

  hasComponent(type: ComponentType) {
    return !!this.components[type]
  }

  getComponent<T extends Component>(type: ComponentType): T {
    return this.components[type] as T
  }

  addChild(entity: Entity) {
    this.children.push(entity)
    entity.parent = this
  }

  removeChild(entity: Entity) {
    const index = this.children.indexOf(entity)
    if (index) {
      this.children.splice(index, 1)
      entity.parent = null
    }
  }

  reset() {
    for (let component of Object.values(this.components)) {
      this.removeComponent(component.type)
    }

    for (let i = 0; i < this.children.length; i++) {
      this.removeChild(this.children[i])
    }
  }
}
