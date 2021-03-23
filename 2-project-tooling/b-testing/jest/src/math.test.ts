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