import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './scope-auth/auth.module'
import { UserModule } from './scope-user/user.module'
import { dataConfig } from './database/data-source'
import config from './configs/configuration'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config]
		}),
		TypeOrmModule.forRoot(dataConfig),
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
