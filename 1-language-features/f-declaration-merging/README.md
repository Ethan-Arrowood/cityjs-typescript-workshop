# Declaration Merging

Consider you're working on a new project for managing Zoo animals. The project depends on a library called `animal`. This library provides a set of interfaces and functions representing different kinds of animals.

```ts
// animal.ts
export interface Animal {
	type: string;
	age: number;
	height: number;
}

export function decorateAnimal<V = unknown>(animal: Animal, key: string, value: V) {
	animal[key] = value
}
```

In your new library, `zoo`, you start modifying `Animal` instances with some additional properties.

```ts
// zoo.ts
import { Animal, decorateAnimal } from 'animal'

const animal: Animal = {
	type: 'Elephant',
	age: 20, // years
	height: 320 // centimeters
}

decorateAnimal(animal, 'name', 'Ralph')
decorateAnimal(animal, 'exhibit', '4B')
```

But how can TypeScript know about these new properties? Well, with **Declaration Merging** we can tell TypeScript of our new properties.

```ts
declare module "animal" {
	interface Animal {
		name: string;
		exhibit: string;
	}
}
```

Specifically, the above example demonstrates [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation), a form of declaration merging for external modules.

Declaration merging is really useful for working with existing code bases and external modules. Under the hood, TypeScript is merging the different declarations together into one. This pattern is most commonly paired with any sort of JavaScript prototype modifications.

JavaScript developers have mixed feelings on prototype modification. Since the introduction of classes into ES6, the recommended pattern is to just create a subclass. But in the instance when you have to modify the type of something existing, **declaration merging** is going to be your best friend.

Most things in TypeScript can be merged, the exception is classes **cannot** be merged with other classes or variables. However, they can be merged with namespaces:

```ts
// album.ts
class Album {
	songs: Album.Song[]
}

namespace Album {
	export class Song {}
}
```

```ts
// index.ts
import Album from 'album'

const album = new Album()
const song = new Album.Song()
```