import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const headerAuth = request.headers?.authorization || ''
		const bearerHeader = headerAuth.replace('Bearer ', '')
		const token = bearerHeader.split('.').length > 1 ? bearerHeader.split('.')[1] : null
		if (!token) return false
		const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
		console.log(decoded)
		const roles = this.reflector.get('user', context.getHandler())
		console.log(roles)
		const user = request.user
		console.log(user)
		return true
	}
}
