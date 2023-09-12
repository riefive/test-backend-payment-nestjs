import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../scope-user/user.service'

@Injectable()
export class AuthService {
	constructor(private usersService: UserService, private jwtService: JwtService) {}

	async login(user: any) {
		const payloads = {
			username: user.name,
			sub: user.userId,
			roles: [user.role]
		}
		return {
			access_token: this.jwtService.sign(payloads)
		}
	}

	validateUser(email: string, password: string): Promise<any> {
		return this.usersService.findOneByEmailAndPassword(email, password)
	}
}
