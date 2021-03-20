function parseInput(x: string): number
function parseInput(x: number, y: number): string
function parseInput(x: string, y: number, z: boolean): boolean
function parseInput (x: string | number, y?: number, z?: boolean): number | string | boolean {
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

const r = parseInput('foo')
const r2 = parseInput(1, 2)
const r3 = parseInput('foo', 3, false)