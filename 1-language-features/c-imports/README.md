# Imports & Exports

> For this section, TypeScript Playground links are not included since the examples deal with multiple files.

## Declaration

TypeScript uses an ESM-like import/export by default. For those unfamiliar, a standard declaration import/export example is as follows:

```ts
// foo.ts

export function foo () {}
```

```ts
// bar.ts

import { foo } from './foo'

foo()
```

## Statements

Export and import statements can be used to collect multiple declarations and rename things.

```ts
// foobar.ts

function foo () {}
function bar () {}

export { foo as fuzz, bar as buzz }
```

```ts
// fuzzbuzz.ts
import { fuzz as FUZZ, buzz as BUZZ } from './foobar'

FUZZ()

BUZZ()
```

## Import/Export Everything

Similar to how statements can be used to import/export individual elements and even rename them, the entirety of a module can be imported at once using the `* as` syntax.

```ts
// foobar.ts
export function foo () {}
export function bar () {}
```

```ts
import * as foobar from './foobar'

foobar.foo()

foobar.bar()
```

You can't exactly export everything the same way, but TypeScript does enable you to _re-export_ everything. This uses a `export from` syntax.

```ts
// numbers.ts
export const x = 0
export const y = 5
export const z = 10
```

```ts
// math.ts
export function add () {}
export function subtract () {}
```

```ts
// library.ts
export * from './numbers'
export * from './math'
```

```ts
// service.ts
import {x, y, z, add, subtract} from './library'

add()
subtract()

console.log(x, y, z)
```

Re-exporting allows for renaming as well

```ts
// index.ts
export * as myMathLibrary from './library'
```

```ts
// service2.ts
import { myMathLibrary } from './index'

myMathLibrary.add()
myMathLibrary.subtract()

const {x, y, z} = myMathLibrary
```

## Default Exports

In addition to named exports, objects can be default exported using the `default` keyword.

```ts
// foo.ts
function foo () {}

export default foo
```

```ts
import foo from './foo'

foo()
```

Default exports still allow for named exports.

```ts
// foo.ts
function foo () {}

const x = 4

const y = true

export default foo
export { x, y }
```

```ts
// bar.ts
import foo, { x, y } from './foo'

foo()

console.log(x, y)
```

## Import for side-effects only

While not a common pattern in modern TypeScript applications, scripts containing side-effects can be imported without any declarations.

```ts
// side-effect.ts
console.log('Hello, World!')
```

```ts
// index.ts
import './side-effect'
```

## Type Import/Export

In TypeScript, everything can be exported, even type definitions, using the `import/export type` feature introduced in version [3.8](https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/#type-only-imports-exports).

```ts
// foo.ts
type Foo = string

export type { Foo }
```

```ts
// bar.ts
import type { Foo } from './foo'

type Bar = Foo | number
```

## Single Object Export

Traditionally, CJS and AMD workflow utilize a single object export pattern `module.exports = MyObject`. Then the `MyObject` can be imported in another module using `const MyObject = require('./myObject')`. TypeScript, and its ESM-like syntax, also supports a similar singular-object pattern using `export =` and `import = require()`.

```ts
// foo.ts
class Foo {}

export = Foo
```

```ts
// bar.ts
import Foo = require('./foo')

class Bar extends Foo {}
```

## ... And So Much More

There is so much more to module organization in TypeScript. ESM vs CJS is an ongoing debate throughout the greater JavaScript/TypeScript/Node.js community. For those seeking more information, I recommend reading the complete TypeScript documentation page on [Modules](https://www.typescriptlang.org/docs/handbook/modules.html).