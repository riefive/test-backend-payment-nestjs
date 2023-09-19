import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './scope-auth/auth.module'
import { ProductModule } from './scope-product/product.module'
import { UserModule } from './scope-user/user.module'
import { TransactionModule } from './scope-transaction/transaction.module'
import { TasksModule } from './tasks/tasks.module'
import { dataConfig } from './database/data-source'
import config from './configs/configuration'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config]
		}),
		TypeOrmModule.forRoot(dataConfig),
		ScheduleModule.forRoot(),
		AuthModule,
		ProductModule,
		UserModule,
		TransactionModule,
		TasksModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
