import { Component } from './Component'
import { ComponentType } from '../components/types'
import { uuid } from '../utils'

export class Entity {
  // @internal
  uuid: string = uuid()

  // @internal
  components: Record<string, Component> = {}

  // @internal
  engineId: string

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
}
