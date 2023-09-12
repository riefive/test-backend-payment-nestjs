import { Controller, Body, Post, Req, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('auth/login')
	async login(@Body() body: any, @Req() req: any) {
		console.log(body)
		const user = await this.authService.validateUser(body.email, body.password)
		if (!user) {
			throw new UnauthorizedException()
		}
		req.user = user
		return this.authService.login(user)
	}
}
