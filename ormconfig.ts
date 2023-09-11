import { Product } from './src/entities/product.entity'
import { User } from './src/entities/user.entity'

export default {
	name: 'default',
	type: 'sqlite',
	database: '.data.sqlite',
	entities: [Product, User],
	synchronize: true,
	logging: false,
	seeds: ['src/migrations/seeds/**/*{.ts,.js}'],
	factories: ['src/migrations/factories/**/*{.ts,.js}']
}
