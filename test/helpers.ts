export type Future<T> = Promise<T> & {
  resolve: (x: T) => void
  reject: (x: Error) => void
  isPending: boolean
}

export function future<T = any>(): Future<T> {
  let resolver: (x: T) => void = (x: T) => {
    throw new Error('Error initilizing mutex')
  }
  let rejecter: (x: Error) => void = (x: Error) => {
    throw x
  }

  const promise: any = new Promise((ok, err) => {
    resolver = ok
    rejecter = err
  })

  promise.then(() => (promise.isPending = false))
  promise.catch(() => (promise.isPending = false))

  promise.resolve = resolver
  promise.reject = rejecter

  promise.isPending = true

  return promise as Future<T>
}
