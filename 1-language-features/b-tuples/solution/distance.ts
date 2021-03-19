type Point = [x: number, y: number]

function distance (point1: Point, point2: Point) {
	// 1. Destructure the x and y values from each point
	const [x1, y1] = point1
	const [x2, y2] = point2

	return Math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
}

console.log(distance([0,0], [3,4])) // -> 5 (Remember Pythagorean triples?)

/*
 * Challenge 2
 * Without using the `Point` type directly, write a new function `slope` that derives its argument types from the `distance` function.
 *
 * Hint: You'll need to use the spread `...` operator
 */
function slope (...args: Parameters<typeof distance>) {
	return (args[1][1] - args[0][1]) / (args[1][0] - args[0][0])
}
