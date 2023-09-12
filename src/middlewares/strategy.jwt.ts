import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import config from '../configs/configuration'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	static key = 'jwt'

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: config()?.jwt?.secret || 'my-secret'
		})
	}

	async validate(payload: any) {
		return {
			userId: payload.sub,
			username: payload.username,
			roles: payload.roles
		}
	}
}
