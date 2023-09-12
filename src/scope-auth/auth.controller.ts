import { Controller, Body, Post, Req, UnauthorizedException } from '@nestjs/common'
import { validateOrReject } from '@nestjs/class-validator'
import { AuthLoginObject } from 'src/data-objects/auth.object'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('auth/login')
	async login(@Body() body: AuthLoginObject, @Req() req: any) {
		try {
			await validateOrReject(body)
		} catch (errors) {
			console.log('Caught promise rejection (validation failed). Errors: ', errors)
		}
		const user = await this.authService.validateUser(body.email, body.password)
		if (!user) {
			throw new UnauthorizedException()
		}
		req.user = user
		return this.authService.login(user)
	}
}
