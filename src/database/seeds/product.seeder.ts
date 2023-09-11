import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Product } from '../../entities/product.entity'

export default class ProductSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const productRepository = await dataSource.getRepository(Product)

		await productRepository.createQueryBuilder().delete().from(Product).where('name is not null').execute()

		const productFactory = await factoryManager.get(Product)
		await productFactory.saveMany(25)
	}
}
