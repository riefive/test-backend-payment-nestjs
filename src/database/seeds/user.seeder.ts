import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../../entities/user.entity'
import { UserRole } from '../../enums/user-role.enum'

export default class UserSeeder implements Seeder {
	public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
		const userRepository = dataSource.getRepository(User)

		const salt = bcrypt.genSaltSync(10)
		await userRepository.createQueryBuilder().delete().from(User).where('name is not null').execute()
		await userRepository.save({
			name: 'Admin Utama',
			email: 'user_admin@sample.dev',
			password: bcrypt.hashSync('admin1234', salt),
			role: UserRole.ADMIN
		})
		await userRepository.save({
			name: 'Pengguna Utama',
			email: 'user_common@sample.dev',
			password: bcrypt.hashSync('common1234', salt),
			role: UserRole.USER
		})

		const userFactory = await factoryManager.get(User)
		await userFactory.save()
		await userFactory.saveMany(10)
	}
}
