export interface Animal {
	type: string;
	age: number;
	height: number;
}

export function decorateAnimal<V = unknown>(animal: Animal, key: string, value: V) {
	animal[key] = value
}