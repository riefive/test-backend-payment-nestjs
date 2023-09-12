import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../entities/user.entity'
import { UserObjectTransfer } from '../data-objects/user.object'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<UserObjectTransfer>
	) {}

	findOne(email: string): Promise<UserObjectTransfer | any> {
		return this.userRepository.findOneBy({ email })
	}

	findOneByEmailAndPassword(email: string, password: string): Promise<UserObjectTransfer | any> {
		const user: any = this.userRepository.findOneBy({ email })
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)
		if (user) {
			const isValid = bcrypt.compareSync(hash, user.password)
			return isValid ? user : null
		}
		return null
	}
}
