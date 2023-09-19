import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TransactionModule } from '../scope-transaction/transaction.module'

@Module({
	imports: [TransactionModule],
	providers: [TasksService]
})
export class TasksModule {}
