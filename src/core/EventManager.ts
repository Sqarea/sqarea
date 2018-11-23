export type EventCallback = (...args: any[]) => void

export class EventManager {
  private listeners: Record<string, EventCallback[]> = {}

  on(evt: string, cb: EventCallback) {
    if (!this.listeners[evt]) {
      this.listeners[evt] = []
    }
    this.listeners[evt].push(cb)

    return () => this.off(evt, cb)
  }

  off(evt: string, cb: EventCallback) {
    const listeners = this.listeners[evt]
    if (listeners) {
      listeners.splice(listeners.indexOf(cb), 1)
    }
  }

  emit(evt: string, ...args: any[]) {
    if (this.listeners[evt]) {
      for (let i = 0; i < this.listeners[evt].length; i++) {
        const cb = this.listeners[evt][i]
        cb(...args[0])
      }
    }
  }
}
