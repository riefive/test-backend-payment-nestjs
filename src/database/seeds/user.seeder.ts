import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../../entities/user.entity'
import { UserRole } from '../../enums/user-role.enum'

export default class UserSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const userRepository = dataSource.getRepository(User)

		await userRepository.createQueryBuilder().delete().from(User).where('name is not null').execute()
		await userRepository.save({
			name: 'Admin Utama',
			email: 'user_admin@sample.dev',
			password: await bcrypt.hash('admin1234', 10),
			role: UserRole.ADMIN
		})
		await userRepository.save({
			name: 'Pengguna Utama',
			email: 'user_common@sample.dev',
			password: await bcrypt.hash('common1234', 10),
			role: UserRole.USER
		})

		const userFactory = await factoryManager.get(User)
		await userFactory.save()
		await userFactory.saveMany(10)
	}
}
