import { Animal, decorateAnimal } from './animal'

const animal: Animal = {
	type: 'Elephant',
	age: 20, // years
	height: 320 // centimeters
}

decorateAnimal(animal, 'name', 'Ralph')
decorateAnimal(animal, 'exhibit', '4B')

declare module "./animal" {
	interface Animal {
		name?: string;
		exhibit?: string;
	}
}