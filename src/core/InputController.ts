export enum Key {
  LEFT = 'LEFT',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  UP = 'UP',
  SPACE = 'SPACE',
  NONE = 'NONE'
}
const keyCodeToKey = {
  40: Key.DOWN,
  38: Key.UP,
  37: Key.LEFT,
  39: Key.RIGHT,
  32: Key.SPACE
}

export type KeyState = Record<Key, boolean>

export class InputController {
  keyState: KeyState = {
    [Key.LEFT]: false,
    [Key.DOWN]: false,
    [Key.RIGHT]: false,
    [Key.UP]: false,
    [Key.SPACE]: false,
    [Key.NONE]: false
  }

  private static instance: InputController

  static getInstance() {
    if (!InputController.instance) {
      InputController.instance = new InputController()
    }
    return InputController.instance
  }

  private constructor() {
    window.addEventListener('keydown', evt => {
      const key = this.getKeyFromKeycode(evt.which)
      this.keyState[key] = true
    })

    window.addEventListener('keyup', evt => {
      const key = this.getKeyFromKeycode(evt.which)
      this.keyState[key] = false
    })
  }

  isDown(key: Key) {
    return this.keyState[key]
  }

  getKeyFromKeycode(keyCode: number) {
    return keyCodeToKey[keyCode] || Key.NONE
  }
}
