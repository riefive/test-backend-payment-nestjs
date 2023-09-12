import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity'
import { UserObject } from '../data-objects/user.object'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<UserObject>
	) {}

	async findOne(email: string): Promise<UserObject | null> {
		const user: any = await this.userRepository.findOneBy({ email: email ?? null })
		if (user) delete user.password
		return user
	}

	async findOneByEmailAndPassword(email: string, password: string): Promise<UserObject | any> {
		const user: any = await this.userRepository.findOneBy({ email })
		if (user) {
			const isValid = bcrypt.compareSync(password, user.password)
			return isValid ? user : null
		}
		return null
	}
}
