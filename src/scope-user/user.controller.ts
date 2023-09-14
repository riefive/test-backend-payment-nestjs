import { Controller, Get, Req, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { UserService } from './user.service'

@Controller()
export class UserController {
	constructor(private userService: UserService) {}

	@Get('user/profile')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('JWT-auth')
	async getProfile(@Req() req: any) {
		const user = req.user
		const email = user.email
		if (!email) {
			throw new BadRequestException()
		}
		const userFound = await this.userService.findOne(email)
		if (!userFound) {
			throw new NotFoundException()
		}
		return { ...userFound }
	}
}
