import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'
import { Product } from '../entities/product.entity'
import { User } from '../entities/user.entity'

const options: DataSourceOptions & SeederOptions = {
	type: 'sqlite',
	database: '.data.sqlite',
	synchronize: true,
	logging: false,
	entities: [Product, User],
	seeds: ['src/database/seeds/**/*{.ts,.js}'],
	factories: ['src/database/factories/**/*{.ts,.js}']
}

export const dataSource = new DataSource(options)
