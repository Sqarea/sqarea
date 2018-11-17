import * as PIXI from 'pixi.js'
import { System, Entity } from 'src/core'
import { Transform, ShapeComponent, BoxShape, BOX_SHAPE } from 'src/components'

export class Engine {
  systems: Record<string, System> = {}
  entities: Record<string, Entity> = {}
  engineObjects: Record<string, PIXI.Container> = {}

  addSystem(system: System) {
    if (!this.systems[system.uuid]) {
      this.systems[system.uuid] = system
    }
    return this
  }

  removeSystem(system: System) {
    delete this.systems[system.uuid]
    return this
  }

  addEntity(entity: Entity) {
    if (!this.entities[entity.uuid]) {
      this.entities[entity.uuid] = entity
    }
    return this
  }

  removeEntity(entity: Entity) {
    delete this.entities[entity.uuid]
    return this
  }

  // @internal
  update(dt: number) {
    for (let system of Object.values(this.systems)) {
      system.update(dt)
    }

    for (let entity of Object.values(this.entities)) {
      const obj = this.engineObjects[entity.engineId]

      if (entity.hasComponent('transform')) {
        const t = entity.getComponent<Transform>('transform')
        obj.position = t.position
        obj.rotation = t.rotation
        obj.scale = t.scale
      }

      if (entity.hasComponent('shape')) {
        const s = entity.getComponent<ShapeComponent>('shape')
        const kind = s.getKind()

        switch (kind) {
          case BOX_SHAPE:
            const shape = new PIXI.Rectangle() as any
            const boxShape = s as BoxShape
            shape.width = boxShape.width
            shape.height = boxShape.height
            obj.addChild(shape)
            break
          default:
            break
        }
      }
    }
  }
}
