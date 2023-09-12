import { Controller, Get } from '@nestjs/common'
import { UserService } from './scope-user/user.service'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor(private readonly appService: AppService, private userService: UserService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@Get('finduser')
	getFindUser(): any {
		return this.userService.findOne('user_admin@sample.dev')
	}
}
