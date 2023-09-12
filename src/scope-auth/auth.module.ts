import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '../middlewares/strategy.jwt'
import { LocalStrategy } from '../middlewares/strategy.local'
import { UserModule } from '../scope-user/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import config from '../configs/configuration'

@Module({
	imports: [
		ConfigModule,
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: config()?.jwt?.secret || 'my-secret',
			signOptions: { expiresIn: '1h' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
