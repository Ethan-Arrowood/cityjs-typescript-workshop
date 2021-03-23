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