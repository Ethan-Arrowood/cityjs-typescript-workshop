# Function Overloading

In JavaScript, overloaded functions don't really exist. Any function can be called with any number of arguments. Depending on how the function is implemented, either it will fail or continue to execute. In TypeScript however, function argument are strictly matched for type, order, and length.

For example, the JavaScript global method, `parseInt`, has two arguments. The first is required, the second optional.

```ts
function parseInt(str: string, radix?: number): number {}
```

Assuming the input arguments are the correct type, TypeScript will error if you try to call it with less than 1 argument or more than 2 arguments.

```ts
parseInt()
parseInt('1', 10, true)
```

Consider this `doSomethingAsync` function. Both arguments are optional. If the callback argument is not defined, the function will return a promise.

```js
function doSomethingAsync(options, callback) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  const result = 42

  if (typeof callback === 'function') {
    setTimeout((callback) => {
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
```

How would we write this same function in TypeScript?

A trivial solution is:

```ts
type Options = unknown
type Callback = (n: number) => void
function doSomethingAsync(options?: Options | Callback, callback?: Callback): void | Promise<number> {}
```

But this definition isn't entirely correct. Technically, a user could call this function using two `Callback` arguments:

```ts
doSomethingAsync(
  (x: number) => console.log(x),
  (y: number) => console.log(y),
)
```

And the user will have to check if the function returned `void` or a `Promise`. All in all, their application code is going to look quite messy.

Using **function overloads**, we can correctly type this function. Overload type definitions are essentially `function` definitions without the code block. They should define arguments and return type, and should start with the simplest case.

```ts
type Options = Record<string, string>
type Callback = (n: number) => void

function doSomethingAsync(): Promise<number>
function doSomethingAsync(options: Options): Promise<number>
function doSomethingAsync(callback: Callback): void
function doSomethingAsync(options: Options, callback: Callback): void
```

After defining all of the possible overload types, the last definition should be a type that satisfies all of the overload cases. This definition should also include a code block that correctly handles all of the possible overloads.

```ts
function doSomethingAsync(options?: Options | Callback, callback?: Callback): void | Promise<number> {}
```

Notice how the last definition for the `doSomethingAsync` function is the same as the _trivial solution_ we started with. Standalone, the single definition is not enough, but paired with the set of finite overloads, TypeScript can correctly infer the arguments and reply types for each unique function call.

```ts
doSomethingAsync().then(console.log)
doSomethingAsync({}).then(console.log)
doSomethingAsync(console.log)
doSomethingAsync({}, console.log)
```

Try this lesson on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsDGUbCIGNCMeNp4AG6Q8Jx4aMY8EsDgqjoAIgCyqnJKxgCwAFAt9o6gAPLuGYgcALwQkIrwxgA8VNCuiBIANKCT0xIAfG0OJADCaJyc6NiggwAUiAKIsEooeQCUB8ug2XiMTa3NkSlpvaDGeADKyjCEEo6KgWVKHK4CAAKBiU7EgYzOFzyq1e73SmS+v3+LCBILB9HRfQE3UJVAhoGhyjhCPOl3gKLeqUJmL+SgBuNBGEOGG2u0w-FAWx2eyw5IeTxajI+GO+rPZM2BnMOBN6Yi6PUyVHmPOF-IEQr52DFj2eUuZsuxgIVeK5Ks1AH5iRq+qAAD6C3ki7We-mOj26o0CcXGN0UmHUxF0u4AbxaAEhGJFQId2pA8Em7S7+tnQAByM29XM3WPNONxnWGnCDTNUeNxmsHUDRgC+8dbL3LmugoHiVFgnG7gwALAAmFrxxPJ1Pp0AVkUHHP5tGF4stUDrjfrqgwAAqjDZeFg0EO3J92H1Z9Ftybdc3c-5h17-egVzXm43zfmfgADL-vQHRTbUBIE4bcb1LON4jiZBEEgUgwypbcT17PBOFyeZ4isYYX2vEt33whZd33NMjxPG5+hjW8CJQtDIEfJxn1fZoCPfT9QB-X8mLLZsuPbdsWgtNkcWtJUrjkFhIEQblNVQyA5AKCQmME+UJEVMEWzEiSpMUPpZPkvBFIErEhKtVSbWk3TODkhSlOMlS1K5FttRkqz9MUoA)

## Challenge

Your turn! Define a function `parseInput`. It should:
- Return a `number` when its one and only argument is a `string`
- Return a `string` when it is called with two arguments of type `number`
- Return a `boolean` when it is called with three arguments of types `string`, `number`, and `boolean`

Here is an example of the function written in JavaScript to get you started

```js
function parseInput (x, y, z) {
  if (typeof x === 'string') {
    return 5
  } else if (typeof x === 'number' && typeof y === 'number') {
    return 'foo'
  } else if (typeof x === 'string' && typeof y === 'number' && typeof z === 'boolean') {
    return true
  } else {
    throw TypeError('Invalid argument types')
  }
}
```

View the solution on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsDGUbCIGNCMeNp4AG6Q8Jx4aMY8EsDgqjoAIgCyqnJKxgCwAFAtkSlpGch0aPBUkACSiHSw0AAUAB4CVNCuiBIAlAKIsEooeW0d6ZmgPX2Dw6OTy6vr8AA0oBYna3lLoDNzEpup2929-UMj41MPsyWXa6gFa3C6gABeAhQeDwnBiiHu0Nh8JenR2e0+h2goGOfyeoAAPsDTnlAQB+G5nS7gimoGFwzT3EFnQl4kqspEM5AAbxaoFAjEiOPsjjwQomoAAvNLQAByR4lWULUC85r8-nxOLIACsfNAAF9QJBOP0BUKxiLIGLQBLpZK5cy8rLQAAyF24BxWoUWKUy2WO+BKlV6jUwBDIWWRGGyvWG42mwXCz3W21+hXzZ1uj2i72++3+kmB13uy3W8F5uWc+FB1Xq0Ca8O4eCwSCxo0mki19UsAykUAAFU9qn0FDGsqG2TQ3GMoF6ISUkEQ2MtVCVsZa+paLUUiBm9aluw+B2+Y6jeDXzR3e-gACYDxjj0c-Jcbwtt5lrwBme9Hr5HSPRpcn6XJEU79G+zRAA)