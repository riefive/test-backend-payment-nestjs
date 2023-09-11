import { define } from 'typeorm-seeding'
import { faker } from '@faker-js/faker'
import { User } from '../../entities/user.entity'

define(User, () => {
	const user = new User()
	const firstName = faker.person.firstName('male')
	const lastName = faker.person.lastName('male')
	user.name = `${firstName} ${lastName}`
	user.email = faker.internet.email({ firstName: firstName, lastName: lastName, provider: 'sample.dev' })
	user.password = faker.internet.password()
	return user
})
