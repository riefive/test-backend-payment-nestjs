import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as bcrypt from 'bcrypt'
import { Product } from '../../entities/product.entity'
import { User } from '../../entities/user.entity'

export default class InitialDatabaseSeed implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<void> {
		const userRepository = await connection.getRepository(User)
		const productRepository = await connection.getRepository(Product)

		await userRepository.createQueryBuilder().delete().from(User).where('name is not null').execute()
		await userRepository.save({ name: 'Pengguna Utama', email: 'user_common@sample.dev', password: await bcrypt.hash('common1234', 10) })
		await userRepository.save({ name: 'Admin Utama', email: 'user_admin@sample.dev', password: await bcrypt.hash('admin1234', 10) })
		await factory(User)().createMany(10)

		await productRepository.createQueryBuilder().delete().from(Product).where('name is not null').execute()
		await factory(Product)().createMany(25)
	}
}
