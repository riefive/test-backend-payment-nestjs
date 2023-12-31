import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> {
		const request = context.switchToHttp().getRequest()
		const headerAuth = request.headers?.authorization || ''
		const bearerHeader = headerAuth.replace('Bearer ', '')
		const token = bearerHeader.split('.').length > 1 ? bearerHeader.split('.')[1] : null
		if (!token) return false
		try {
			const decoded = JSON.parse(Buffer.from(token, 'base64').toString())
			if (decoded.username && decoded.roles) {
				request.user = decoded
				return true
			}
		} catch (_error) {
			return false
		}
	}
}
