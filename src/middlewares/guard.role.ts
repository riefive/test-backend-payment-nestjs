import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler())
		if (!roles) return false
		const request = context.switchToHttp().getRequest()
		const user = request.user
		return this.validateRoles(roles, user)
	}

	validateRoles(roles: string[], user: any) {
		return roles.some((role) => user.roles?.includes(role))
	}
}
