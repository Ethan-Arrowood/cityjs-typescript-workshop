# Optional Chaining & Nullish Coalescing

Optional chaining and nullish coalescing were added in [TypeScript 3.7](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html) and are apart of the ECMAScript 2020 standard.

> Fun fact: the optional chaining feature was [issue #16](https://github.com/microsoft/TypeScript/issues/16) for the TypeScript repo. It was opened on July 15th, 2014!

The following sections introduce both operations individually, and then demonstrates how they can used together.

## Optional Chaining

> At its core, optional chaining lets us write code where TypeScript can immediately stop running some expressions if we run into a `null` or `undefined`.
> - [TypeScript 3.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)

Given an object with potentially `null` or `undefined` properties, accessing nested properties on the object will result in an error.

```ts
type Obj = { foo?: { bar: any }}
const obj: Obj = {}
obj.foo.bar // Object is possibly 'undefined'. (2532)
```

An easy solution for this is to check if the `foo` property exists.

```ts
obj.foo === null || obj.foo === undefined ? undefined : obj.foo.bar
```

Optional chaining simplifies these checks using the `?.` operator for _optional property access_. When the interpreter reaches this operator, if the previous property access is `undefined`, then the entire expression returns `undefined`, otherwise, it continues access properties in the expression.

```ts
obj.foo?.bar
```

The `?.` operator always comes after the property that is potentially `null` or `undefined`.

Try the previous examples on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDEKWkZWTl5iAUAUB32jqAA8ihWoAC8oADeoJF4eAD8AhPo8AKaFqAAvmsdiohU0KB4gwIDQ6NjmyD7g3JTeHKLHQdW19OgAITDo8WloABkP5dPG5vD6gWCIYyQSI8SDGUAzAHPW6LUACMEQqGIGEPK43GZ3NDwIA)

Optional chaining can also be used for callable objects (i.e. functions).

```ts
type Obj = { f?: () => void }
const obj: Obj = {}
obj.f?.()
```

Try this example on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDEKWkZWTl5iAUAUB32jqAA8ihWoAC8oADeoJEA-AIAFACUIwB8oABueIzGoAC+HYqIVNCgeIMCA0OjY7snVnLTcgtAA)

### Challenge:

Given the following object and type definition, use optional chaining to safely access the `e` property

```ts
type Obj = {
  a?: {
    b?: {
      c?: {
        d?: {
          e: any
        }
      }
    }
  }
}

const obj: Obj = {}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDEKWkZWTl5iAUAUB32jqAA8ihWoAC8oADeHaBToGgA-AIT00uo8+OTyxsYq4sbu1PG2+t7x6CQApoWRyfTAL5Xe3cPV3d3HYqIVNCgeIMCA0OjMZ3IA)

## Nullish Coalescing

The nullish coalescing operation is very similar to optional chaining (and the next section shows how they can be used together). The operation allows developers to define a better default value when dealing with `null` or `undefined` expressions.

Given an expression that defaults when a value is `null` or `undefined`:

```ts
type Foo = null | undefined | string
const f: Foo = null
const g = f !== null && f != undefined ? f : 'foo'
```

The nullish coalescing operator `??` can simplify the expression:

```ts
const g = f ?? 'foo'
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDExaXshBVVzgUAUB32jqAAYngEALygjZygAD6gsIjGkJE8kMaToFTQrrUdiohroJECA8OjJZwdIKDbuxKgI5GgAIRDI2OgAGSvew8jM3MLiEugAD8nwEAHJIoNQVt0lcbp9AcDwZCgA)

This operation seems very similar to an `||` assignment expression: `const g = f || 'foo'`. But the major difference is the strictness of `??`. The `||` assignment expression will evaluate for any falsy value including `0`, `NaN`, and `""`.

For example, given an assignment operation that defaults to the value `1`. When the initializer value is `0`, the `||` assignment expression will still default to `1`. Using `??` instead, the `0` value will be properly assigned.

```ts
const c1 = 0 || 1 // -> 1
const c2 = 5 || 1 // -> 5

const c3 = 0 ?? 1 // -> 0
const c4 = 5 ?? 1 // -> 5
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDExaXshBVVzgUAUB2KiFTQoBh+oAC8oAAMoAA+k6B+3el9AwBMI6AArFMzc-O9-RgAzKsTAPzHszuLGAAsqxuns0A)

### Challenge

Given the following `Input` type, complete the `defaultFromInput` function so that it returns an object with the propery `fuzz` that is derived from `input.bar` and defaults to the number `7`.

```ts
type Input = {
  foo: string,
  bar?: number | null
}

function defaultFromInput(input: Input) {
  return {
    // TODO
  }
}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDExaXshBVVzgUAUB32jqAAkoh0sNCgALygAN4dAJCReHgCVNCutQA0M+jwAPwCxUookPCgAD6gjZwdAL5dkbCIGKnpoMaQkWgl0ABiBkoDQ9AACh4-wEf2GAEpJjN4nFkFNptMQKAACoAeQAIqiZtdLkA)

## Putting it all together

Together, optional chaining and nullish coalescing are powerful. Consider a complex `input` argument. It could be an object with many different properties, some that could be `null` or `undefined`. And with this `input`, the function has to derive a new object that properly defaults certain values. By utilizing both operations, the function can be thoroughly simplified.

### Example

Pretend you work for a pet foster and adoption agency. You had some old pet records and are trying to retrieve all of the previous foster home addresses for your new database. Given the following type definitions and a list of pet records, write a function that returns a new list of the pet record **foster** home addresses.

```ts
type Address = {
  addressLine1: string,
  addressLine2?: string,
  aptUnitNumber?: string,
  city: string,
  state: string,
  country: string,
  zipcode: string,
  toString: () => string
}

type Person = {
  name: {
    first: string,
    last: string,
  },
  prefix?: string,
  preferredPronouns: string,
  homeAddress?: Address
}

type Pet = {
  name: string,
  type: 'dog' | 'cat',
  fosterParent?: Person,
  adoptionParent?: Person
}

function addressToString (this: Address) {
  return `${this.addressLine1}
${this.addressLine2 ?? '\b'}
${this.aptUnitNumber ?? '\b'}
${this.city}, ${this.state}, ${this.country}
${this.zipcode}`
}

const pets: Pet[] = [
  {
    name: 'Tramp',
    type: 'dog',
    fosterParent: {
      name: {
        first: 'Jack',
        last: 'Smith'
      },
      preferredPronouns: 'he/him/his',
      homeAddress: {
        addressLine1: '123 Apple St.',
        aptUnitNumber: '2B',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        zipcode: '12345',
        toString: addressToString
      }
    }
  },
  {
    name: 'Lady',
    type: 'dog',
    adoptionParent: {
      name: {
        first: 'Jim',
        last: 'Dear'
      },
      preferredPronouns: 'he/him/his',
      homeAddress: {
        addressLine1: '456 Umbrella Ave.',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        zipcode: '67890',
        toString: addressToString
      }
    }
  }
]

function getFosterHomeAddresses (pets: Pet[]) {
  // todo
}
```

Try this challenge on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDEdLDCBVrMWplZ+OEskPAAUH32jqA6xsbxVBwAvKAA3n0AkGhjE1QAMjyQfgJU0K61ADSLy+NO65sATAD8O3sFR0vuAKqIzABysEoovTegu-sSB7mey3AEPXaxSCg+6LRSwRB7CzQw6LABebkUxihfzuKIW+AAyriJAIABQASlAUwAfDiAX0AL4DIYkAAKvSo6Spc0WGSU2PmCwWkUY8F2yMBiwWQXFdJhCwZDzo8RFAA9fv95crINF9JBjKyDIg8PCxHK8bR+aNTpNftbVozmQ42TBuYK+djNXiWQIAOTGPASX2gAA+oF9GFivoekTwu16rLQ8QRv3ZYvSD2WKTSiETyegqY56UdfUi8IwqS5J1WABU8ESAaBSSx2AJ7WdKYL4nFkAADAAksxbVDk1bOG0QWyZg+Ho5W48uoCuV3DAB0UL7p0PCOxR89XtAPl9ekuV7715u+jOdyPgRZFaBr7uIdBIA+n7eTQj4Per9vd+idCYm+vYlooiC7KAjjQGa7LQAA2gAuty8GLIKCwen6NbwGgSh0NGUo+uGAZBg8wpxq+8B5pACICOhGG4QKUpCiKYrQH6ABSmBYARQpCjK7HhgSSjSL6zGKsx2q6vEBpGl+Zq+sQwA7ioN68UKlqQO2kx0cxSzzpME5bH6fgXAAzCMdB0JwJBEnI6lCmg+7vJ83zwH6FwAEIOQsd5+p5FHpD5L7Yr6ACyOg+XC35IuGTwEpFZFCoBwEmeZAAsACsPmEsSAhjpMdYNgU4lSkyCoPOhmHhmsywWOpRH+oG6lZu4ObUbRPJ8dV9HCqKsq+hxjBKD5Al+gAIjE8BiXxEl8VJvQyYa6TyX6Skqcp7AOZp2lmr1BXnJO2zhllABsoBPF88SlGgIwAG6QPZSW+ZYfpvJApCgAAmhQOAAMKWMF0CQm9X1RV+iJ+vFiV6SlJihadADsAAcACcAAMOX1nloAHUVxKlUK5VMohAxlogFY5qA3QAGIUb0AASyhaQZVBOE20GwTASGdosIC4CYeCMkAA)

Solution: [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsBoWvTQjHiIaJxaGIRoPDwSWoiwnNw02XiZTuaIEgDEdLDCBVrMWplZ+OEskPAAUH32jqA6xsbxVBwAvKAA3n0AkGhjE1QAMjyQfgJU0K61ADSLy+NO65sATAD8O3sFR0vuAKqIzABysEoovTegu-sSB7mey3AEPXaxSCg+6LRSwRB7CzQw6LABebkUxihfzuKIW+AAyriJAIABQASlAUwAfDiwX0AL4DIYkAAKvSo6Spc0WGSU2PmCwWkUY8F2yMBiwWQXFdJhCwZDzo8RFAA9fv95crINF9JBjKyDIg8PCxHK8bR+aNTpNftbVozmQ42TBuYK+djNXiWQIAOTGPASX2gAA+oF9GFivoekTwu16rLQ8QRv3ZYvSD2WKTSiETyegqY56UdfUi8IwqS53QAYnHoL0ABLKSD2s5OUCkxzQM3s6AAbQAupTBfE4sgu1Q5Eo0HRO66aTyhaOEOOYHJY-H4HnICm5JaWyszlc5ITiRTQFcruG3nhoKAN-X4sZfYsGeSS2XEBWc6ATqsACp4ESAIdiw7ACK2kzDosy5IKAAAGAAksxgZOf5nBsiBbEyyGoXI6GTJhkAXBeV6+gAOigvo4ShhDsPhzyvNAHxfL0pHhpR1F9LhdGTsCFiKqAPH0RC9aCcJfEmgi8ACdxtH0eidCYpADLwSWiiILsoATgIvaDtyfaLIKCwen6-7wGgSh0NGUo+uGAZBg8wp1gmSY7tAAjGSZlkClKQoimKHnhgAUpgWA2UKQoykFvoEko0gvpFip+dqupPoa6RSWavrEMAdEqLxEVCvukFml5SyHoRmzbOGfgXAAzCMdB0JwJBEnIRVCjO0AvO8nzfPAfoXAAQp1Cz8X6w11ukY2idivoALI6GNcLSUi4ZPASy1OUKinKX6dX1QALAArGNp4AgIBFUIBwEFH5TJCo9yULMZpnhmsywWEVdn+oGRVZu4Obbginl+e95UBbKvrBYwShjdFfoACIxPAiVPTtqW9OlRpZX6uX5Xl7CdSVlVlX5FU2ucWE1b6p0AGygE8XzxKUaAjAAbpAHU7eNlh+m8kCkKAACaFA4AAwpYs3QJCAsiytUmIn6m3bRTe0mPN9MAOwABwAJwAAznUBxJXWTt3Eg9UrPX0A4DBpnKtXInCBqSNYufATZWmTThzt25LkkAA)