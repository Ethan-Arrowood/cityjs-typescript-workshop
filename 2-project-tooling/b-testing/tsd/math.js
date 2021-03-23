function sum (nums) {
	if (nums.length === 0) {
		throw Error(errorMessage)
	}

	return nums.reduce((prev, curr) => prev + curr, 0)
}

function multiply (nums) {
	if (nums.length === 0) {
		throw Error(errorMessage)
	}

	return nums.reduce((prev, curr) => prev * curr, 1)
}

const errorMessage = 'Input array cannot be empty'

export {
	sum,
	multiply,
	errorMessage
}