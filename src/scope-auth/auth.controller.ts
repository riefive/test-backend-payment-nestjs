import { Controller, Body, Post, UnauthorizedException } from '@nestjs/common'
import { AuthLoginObject } from '../data-objects/auth.object'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('auth/login')
	async login(@Body() body: AuthLoginObject) {
		const user = await this.authService.validateUser(body.email, body.password)
		if (!user) {
			throw new UnauthorizedException()
		}
		return this.authService.login(user)
	}
}
