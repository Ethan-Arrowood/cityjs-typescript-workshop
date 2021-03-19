type Address = {
	addressLine1: string,
	addressLine2?: string,
	aptUnitNumber?: string,
	city: string,
	state: string,
	country: string,
	zipcode: string,
	toString: () => string,
}

type Person = {
	name: {
		first: string,
		last: string,
	},
	prefix?: string,
	preferredPronouns: string,
	homeAddress?: Address
}

type Pet = {
	name: string,
	type: 'dog' | 'cat',
	fosterParent?: Person,
	adoptionParent?: Person
}

function addressToString (this: Address) {
	return `${this.addressLine1}
${this.addressLine2 ?? '\b'}
${this.aptUnitNumber ?? '\b'}
${this.city}, ${this.state}, ${this.country}
${this.zipcode}`
}

const pets: Pet[] = [
	{
		name: 'Tramp',
		type: 'dog',
		fosterParent: {
			name: {
				first: 'Jack',
				last: 'Smith'
			},
			preferredPronouns: 'he/him/his',
			homeAddress: {
				addressLine1: '123 Apple St.',
				aptUnitNumber: '2B',
				city: 'Boston',
				state: 'MA',
				country: 'USA',
				zipcode: '12345',
				toString: addressToString
			}
		}
	},
	{
		name: 'Lady',
		type: 'dog',
		adoptionParent: {
			name: {
				first: 'Jim',
				last: 'Dear'
			},
			preferredPronouns: 'he/him/his',
			homeAddress: {
				addressLine1: '456 Umbrella Ave.',
				city: 'New York City',
				state: 'NY',
				country: 'USA',
				zipcode: '67890',
				toString: addressToString
			}
		}
	}
]

function getFosterHomeAddresses (pets: Pet[]) {
	return pets.map(pet => {
		return pet.fosterParent?.homeAddress?.toString() ?? 'Not fostered'
	})
}

console.log(getFosterHomeAddresses(pets))