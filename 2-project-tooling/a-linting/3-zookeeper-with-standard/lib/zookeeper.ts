type AnimalType = 'lion' | 'tiger' | 'elephant' | 'zebra'

export class Animal {
  name: string
  type: AnimalType
  constructor (name: string, type: AnimalType) {
    this.name = name
    this.type = type
  }
}

export class Exhibit {
  animals: Animal[] = []

  animalType: AnimalType
  location: string
  occupancyLimit: number
  constructor (animalType: AnimalType, location: string, occupancyLimit: number) {
    this.animalType = animalType
    this.location = location
    this.occupancyLimit = occupancyLimit
  }
}

export default class ZooKeeper {
  exhibits: Exhibit[] = []

  addExhibit (exhibit: Exhibit): void {
    this.exhibits.push(exhibit)
  }

  addAnimal (animal: Animal, exhibit: Exhibit): void {
    if (animal.type !== exhibit.animalType) {
      throw Error(`Incorrect animal type ${animal.type} for exhibit ${exhibit.location}. Expected ${exhibit.animalType}`)
    }

    if (exhibit.animals.length === exhibit.occupancyLimit) {
      throw Error(`Occupancy limit reached for exhibit ${exhibit.location}`)
    }

    exhibit.animals.push(animal)
  }
}
