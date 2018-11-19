import * as PIXI from 'pixi.js'
import { System, Entity } from 'src/core'
import { ShapeComponent, Transform, BoxShape } from 'src/components'
import { BOX_SHAPE, ComponentType } from 'src/components/types'
import { uuid } from 'src/utils'

export class Engine {
  systems: Record<string, System> = {}
  entities: Record<string, Entity> = {}
  engineObjects: Record<string, PIXI.Container> = {}
  app: PIXI.Application

  private static instance: Engine

  private componentHandlers = {
    transform: this.handleTransform,
    shape: this.handleShape
  }

  static getInstance(app: PIXI.Application): Engine {
    if (!Engine.instance) {
      Engine.instance = new Engine(app)
    }
    return Engine.instance
  }

  private constructor(app: PIXI.Application) {
    this.app = app
  }

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
      const obj = new PIXI.Container()
      const id = uuid()
      obj['uuid'] = id
      entity.engineId = id
      this.entities[entity.uuid] = entity
      this.engineObjects[id] = obj
      this.app.stage.addChild(obj)
    }
    return this
  }

  removeEntity(entity: Entity) {
    delete this.entities[entity.uuid]
    this.app.stage.removeChild(this.engineObjects[entity.engineId])
    return this
  }

  // @internal
  update(dt: number) {
    for (let system of Object.values(this.systems)) {
      system.update(dt)
    }

    for (let entity of Object.values(this.entities)) {
      for (let component of Object.values(entity.components)) {
        // Only some components are handled by the engine
        // The rest are userland/gameplay-centric
        if (component.isDirty && this.componentHandlers[component.type]) {
          this.componentHandlers[component.type].call(this, entity)
          component.isDirty = false
        }
      }
    }
  }

  private handleTransform(entity: Entity) {
    const obj = this.engineObjects[entity.engineId]
    const t = entity.getComponent<Transform>('transform')
    obj.position = t.position
    obj.rotation = t.rotation
    obj.scale = t.scale
  }

  private handleShape(entity: Entity) {
    const obj = this.engineObjects[entity.engineId]
    const shape = entity.getComponent<ShapeComponent>('shape')
    const kind = shape.getKind()

    switch (kind) {
      case BOX_SHAPE:
        const graphics = new PIXI.Graphics()
        const boxShape = shape as BoxShape
        graphics.beginFill(0xf4007a, 1)
        graphics.drawRect(0, 0, boxShape.height, boxShape.width)
        graphics.endFill()
        obj.addChild(graphics)
        break
      default:
        break
    }
  }
}
