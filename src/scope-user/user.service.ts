/*
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { UserObjectTransfer } from '../data-objects/user.object'

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<UserObjectTransfer>
	) {}

	findOne(email: string): Promise<UserObjectTransfer> {
		return this.userRepository.findOneBy({ email })
	}
}
*/
