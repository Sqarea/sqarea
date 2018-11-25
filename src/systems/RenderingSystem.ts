import { Entity } from 'src/core'
import { ShapeComponent, ComponentType } from 'src/components'
import { InternalSystem } from './InternalSystem'

export class RenderingSystem extends InternalSystem {
  constructor(app: PIXI.Application) {
    super(app)
  }

  update(_: number) {
    for (let entity of Object.values(this.trackedEntities)) {
      const shape = entity.getComponent<ShapeComponent>('shape')

      if (shape.isDirty) {
        const container = this.app.stage.getChildByName(entity.uuid) as PIXI.Container
        shape.updateContainer(container)
        shape.isDirty = false
      }
    }
  }

  protected handleComponentAdded = (entity: Entity, componentType: ComponentType) => {
    if (componentType === 'shape') {
      this.addEntity(entity)
    }
  }

  protected handleComponentRemoved = (entity: Entity, componentType: ComponentType) => {
    if (componentType === 'shape') {
      this.removeEntity(entity)
    }
  }
}
