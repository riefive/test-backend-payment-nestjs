import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import config from '../configs/configuration'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
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
