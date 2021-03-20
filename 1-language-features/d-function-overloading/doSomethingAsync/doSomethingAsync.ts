type Options = Record<string, string>
type Callback = (n: number) => void

function doSomethingAsync(): Promise<number>
function doSomethingAsync(options: Options): Promise<number>
function doSomethingAsync(callback: Callback): void
function doSomethingAsync(options: Options, callback: Callback): void
function doSomethingAsync(options?: Options | Callback, callback?: Callback): void | Promise<number> {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const result = 42

  if (typeof callback === 'function') {
    setTimeout((callback: Callback) => {
      callback(result)
    }, 1000, callback)
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result)
      }, 1000)
    })
  }
}

doSomethingAsync().then(console.log)
doSomethingAsync({}).then(console.log)
doSomethingAsync(console.log)
doSomethingAsync({}, console.log)