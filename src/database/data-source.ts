import { DataSource, DataSourceOptions } from 'typeorm'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { SeederOptions } from 'typeorm-extension'
import { Product } from '../entities/product.entity'
import { User } from '../entities/user.entity'

const dataRawConfigs: any = { type: 'sqlite', database: '.data.sqlite', logging: false, entities: ['dist/**/*.entity{.ts,.js}'], synchronize: true }

const options: DataSourceOptions & SeederOptions = {
	...dataRawConfigs,
	entities: [Product, User],
	seeds: ['src/database/seeds/**/*{.ts,.js}'],
	factories: ['src/database/factories/**/*{.ts,.js}']
}

export const dataSource = new DataSource(options)

export const dataConfig: SqliteConnectionOptions = { ...dataRawConfigs }
