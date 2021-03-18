# Tuples

A tuple is an `Array` type that knows the exact number, position, and types of its elements. They are commonly used to represent things that might have an _obvious_ structure to them.

```ts
type Point = [number, number]

function printPoint (point: Point) {
  const x = point[0]
  const y = point[1]
  console.log(`(${x}, ${y})`)
}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEcKlOALAAUFX2jqAACng80KAAvKAA2oiwSiiQ8AA0oN29-QC6VVWRsIgY0Ix4yHSuiNCNzaAAFHRNqwLrqwCUoADeVQCQiohULQAebaA7zR0ADBOVl4s3oBYPT6sdPzvT7XPBpOScPASTYAA02ABITrcAL5DREWZGHGGHKrIoA)

## Difference from `Array`

They differ from `Array` definitions because they have a fixed length. TypeScript will throw an error if the code trys to access an element out of bounds of the tuple.

```ts
type Point = [number, number]

function printPoint (point: Point) {
  const x = point[0]
  const y = point[1]
  const z = point[2] // Error: Tuple type 'Point' of length '2' has no element at index '2'.(2493)
  console.log(`(${x}, ${y})`)
}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDExoyR0fGIGBGRBkpaaPpoFgCwAFDt9o6gAAp4PNCgALygANqIsEookPAANKATUzMAuu3tkbBV0Ix4yHSuiNB9A6AAFHT9hwLHhwCUoADe7QCQiohUgwAew6AXA6MABlWbVeuw+oAsPz+h1GfmBoPegwAXlDLtBRgAmZagECgVT6CgCAAqKTSuAcJAA5DdoJTQHhIlxIIgJCxQJSMXTCGgOIgCJA0kpmYNYqAeMZIN8OZS5GcMQAWACcAGZbi83lQ8Gk5Jw8BJTgADU4AEgenwAvvNTRZzbcDWq2uagA)

## Destructuring

Tuples are commonly used with array destructuring.

```ts
type Point = [number, number]

function printPoint(point: Point) {
  const [x, y] = point
  console.log(`(${x}, ${y})`)
}

printPoint([5, 10])
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEcKlORcZO0PCwGHE8EgCwAFAt9o6gAAp4PNCgALygANqIsEookPAANKCj45MAui0tkbCIdYx4yHSuiNDdvQAUdD17Agd7AJSgAN4tAJCKiFR9QwAeMxYLA6AnvQ9PKh4NJyTh4CSHAAGhwAJDc3gBfGZwiwIy6Qy4tBHLZo7XoXaCHIYAVhmfgADAtLkA)

## Optional & Rest Elements

Using the `?` operator, tuple definitions can support optional elements.

```ts
// Represents either a 1D, 2D, or 3D point
type Point = [number, number?, number?]

function deriveCoord(point: Point) {
  const [x, y, z] = point
  // ...
}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEcKlORfTQjHiIaJxaWvFUHpBpSpCI0FQAsABQfSAQkHRNHV2gkNKQ8KBooH5ZADSgAExLoBSgAMxZoHR4PNB99o6gAAoHnaAAvKAA2oiwSijTy4-P0wD8b08v8J8AXT6fUisEQGCqNVAxmmjAAbpAAMJ4CjGAAU+0OAguhwAlKAAN59UCgRSIZr3AAeywsywAXgCbntLkdeiTBnJOX0AL5AA)

And even rest elements.

```ts
type Input = [string, ...boolean[]]

function parseInput(input: Input) {
  const [name, ...flags] = input
}
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEcKlORfTQjHiIaJxaWvFUHpBpSpCI0FQAsABQffaOoACSiHSw0KAAvKAA2s2uiBIANKBy6yh4eGmaswC6e319kbCIGFU1oHRo8FSQo+PQABQ8jwIPEwCUoADefaCgRSIZpzWrtVbrOSRIISKh7aagV4TPoAXyAA)

## Named Tuples

In TypeScript 4.0, named tuples were added to provide a better developer experience with tuple types.

```ts
type Location = [lat: number, long: number]

const location: Location = [42.361, -71.057]
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEiGhKkMbJqU4AsABQ9faOoAAyeBixjHjIALygANpB0AKIsEookPAANFzdEiNjE-AAuvX1iohU0LMd0F2IAm27+6B9-QAsAExyAMwAbH4zWgDsfnIADACsz8tAA)

At the code level this doesn't really change much, but with IntelliSense tools like those provided by VSCode, the values in the `location` array will signify the name provided in the `Location` type signature.

This feature is useful when extracting function parameters using the `Parameter` utility type.

```ts
function printAddress (street: string, city: string, zipcode: string) {}

type PrintAddressParams = Parameters<typeof printAddress>
// -> type PrintAddressParams = [string: string, city: string, zipcode: string]
```

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEiGhKkMbJqU4AsABQ9ZGwiBjQjHjIdK6I0DrGxvFUHAAUVNDxMAJj3RIANKDm9lPjPHOgAF5uisaQyzMAlKAA3gC+9fX2jqAACt29-YNU12jwZRwAvDcvZTCQ8FQAHkukDwkVAXR49wGTioAD56iBQFpYbgHCRbpC+tChs9XkoPqAANrTVZ7VbzRYWMmINabOjbXagEk0gC6QA)

## Challenge

Given a tuple type `Point`, write a function `distance` that destructures the `x` and `y` values from each point and then calculates the distance between the two 2D points.

```ts
type Point = [x: number, y: number]

function distance (point1: Point, point2: Point) {
  // todo

  return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
}
```

Without using the `Point` type directly, write a new function `slope` that derives its argument types from the `distance` function.

```ts
function slope (/* todo */) {
  return (args[1][1] - args[0][1]) / (args[1][0] - args[0][0])
}
```

Hint: You'll need to use the spread `...` operator

Try it on [TypeScript Playground](https://www.typescriptlang.org/play?#code/PTAECUFMBcFcCcB2oBGBDAxga1NA9rgBaSgDue8WAzoXgA5kCW0hRjVoANo4lgFyhC0aHSp8QAc2aFYKAHQY8AW2ABRFmkQBaAILx4ecngAmwDMwCeAKypboFupCoZ4jOtC3lKNesACMWpyaErBoEpBaAGaQaHDwTsAodrB0nAngqjoAIgCyqnJKxgDEGIRonGmI4QCwAFB19o6gAAp4PNCgALygANoAHgKIsEookPAANKAWg8Oj8AC6dXWRsIgY0Ix4yMbs0JoYJAAUdG2I0H4Cre2TJ+0ATJen0ACUoADedQCQIKAAwmUVSBVEh+L4-LJOaDwWDrBAkFgkPqgTTGKagABu5VgTlAkQMSlAMVKoFuZ2R8BCSiB0CWtU+8TiyBysUIcioAEd4NBDoc+ndQFpQH0-M8AFSi-kAalAhws-MFFhF4ruzzqAF9aYpEFQ8Gk5Jw8BJDjsqHs1pBDj0AAzjK3zSY9ADM4wALPNnq8floAHygACsMqgVJGYxaFg0EgoMWQULcaSoAH5VfVasBRXVQKK-gDKuFQHcM1mAOrSPCwDqwKg8CREEgAAyuZzruAcJB28XWnAsk1IrmgJDQoEQkFIuNW602yDrVANjmbGg6xjGjHROOYHDQFOG1Jbjg4eOUtdAdZNZoOzZWaw2WzkhcLoAAEu0BABNMsAcgqQ8gkFR+FAlbwsQoBUHQ8RoKidZyNBzb0GMsQUIWwDLOO17IDOcEyq8Hx0gyCDIIcm4SFQPR+PMpHzAK5LEda5FkZ6MpESRZG0VRTG0bRyYarUQA)

## TypeScript Playground Examples

Much of the content in this lesson was based on the excellent examples provided by the TypeScript site.

- [example/tuples](https://www.typescriptlang.org/play?ts=4.0.2#example/tuples)
- [example/named-tuples](https://www.typescriptlang.org/play?ts=4.0.2#example/named-tuples)