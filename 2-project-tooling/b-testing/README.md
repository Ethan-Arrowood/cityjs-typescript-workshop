# Testing

> Since I've started interviewing for my team I've learned that one of the most impressive skills a candidate can demonstrate are competent testing strategies.

This section focusses on two aspects of testing TypeScript applications, unit testing and type definition testing. While integration and E2E testing are very important concepts, they tent to be a step-away from the source code.

## Unit Testing Frameworks

The most popular testing framework is [Jest](https://jestjs.io/). It's used heavily in both frontend and backend TypeScript development. In addition to Jest, this part highlights another framework, [node-tap](https://node-tap.org/). Tap is my go to testing library for Node.js and it comes with out-of-the-box TypeScript support!

### Jest

Jest and TypeScript work using `ts-jest` library. Essentially, test files (written in TypeScript) are transformed to JavaScript and then executed against the also transformed source files. The special transformer is important for keeping track of test details like where a test fails, coverage mapping support, and more.

1. Install:
  ```sh
  npm i -D jest @types/jest ts-jest
  ```
2. Generate a jest config file using `npx ts-jest config:init`
3. Modify **package.json** `"test"` script to be `"jest"`
4. Create a file in the `src` directory called **math.test.ts**

In **math.test.ts** add the following code:

```ts
import { sum, multiply } from './math'

describe('math', () => {
  test('returns sum of list of numbers', () => {
    const input = [1, 2, 3, 4, 5]
    const result = 15
    expect(sum(input)).toBe(result)
  })

  test('returns product of list of numbers', () => {
    const input = [1, 2, 3, 4, 5]
    const result = 120
    expect(multiply(input)).toBe(result)
  })

  test('throws error for empty list', () => {
    expect(() => sum([])).toThrow()
    expect(() => multiply([])).toThrow()
  })
})
```

Jest utilizes a lot of global objects; thus, no need to import `describe`, `test`, or `expect`. Since `@types/jest` was installed, TypeScript should have no problem with these objects. Their types are decorated onto the global object using _declaration merging_.

Run the test using `npm run test` 🧪

### node-tap

TAP stands for "test anything protocol". It is not unique to JavaScript, and is used by many other developer communities (one such example is Ruby). The [node-tap](https://node-tap.org/) library is an implementation of TAP and there are other implementations, but this is the one I've used most and is what powers an incredible amount of popular JavaScript and TypeScript projects (such as Fastify).

1. Install node-tap
  ```sh
  npm i -D tap @types/tap
  ```
2. Modify **package.json** `"test"` script to be `"tap"`
3. Create a file in the `src` directory called **math.test.ts**

In **math.test.ts** add the following code:

```ts
import tap from 'tap'
import { sum, multiply } from './math'

tap.test('math', t => {
  t.plan(3)

  t.test('returns sum of list of numbers', t => {
    t.plan(1)
    const input = [1, 2, 3, 4, 5]
    const result = 15
    t.equal(sum(input), result)
  })

  t.test('returns product of list of numbers', t => {
    t.plan(1)
    const input = [1, 2, 3, 4, 5]
    const result = 120
    t.equal(multiply(input), result)
  })

  t.test('throws error for empty list', t => {
    t.plan(2)
    t.throws(() => sum([]))
    t.throws(() => multiply([]))
  })
})
```

node-tap does not decorate the global space and requires more declarative test blocks. Each test block (the second argument for the `.test()` method) is passed a parameter `t` which is a `tap` instance. Each test block must end with `t.end()` or be preceded by a call to `t.plan()` so the test runner knows how many assertions to expect. This pattern is what makes `tap` so wonderful and it works really well with async code bases.

Furthermore, node-tap supports TypeScript out of the box. As long as the file is named `.ts` tap will automatically do the necessary transform and will produce accurate test errors and coverage reporting.

## Type Definition Testing

Consider a scenario where you have a JavaScript library looking to provide TypeScript definitions. These definitions are not generated in any way and are yet another piece of the code base. As such they should be tested in some fashion! But types are removed at build time so you can't exactly test the code while it is executing can you?

Introducing, [tsd](https://github.com/SamVerschueren/tsd). This library enables you to write type definition tests in an unit-test-like format.

In the **tsd** directory you'll find a JavaScript version of the `math` library we've been testing. There is also a type definition file **math.d.ts**.

1. Install tsd
  ```sh
  npm i -D typescript tsd
  ```
2. Modify **package.json** `"test"` script to be `"tap"`
3. Create a test file **math.test-d.ts**

In **math.test-d.ts** add the following code:

```ts
import { expectType } from 'tsd'
import { sum, multiply } from './math'

expectType<number>(sum([1, 2, 3]))
expectType<number>(multiply([1, 2, 3]))
```
4. Run the tests with `npm run test`

Type definition tests are strictly for testing type definitions; the purpose here is not to test the execution of these methods, but what their return type resolves too. This kind of testing is really useful because just like the javascript source code, when the type definitions change we want that to fail in something like a CI run.
