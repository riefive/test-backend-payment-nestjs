import { Injectable, Logger } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { TransactionService } from '../scope-transaction/transaction.service'

@Injectable()
export class TasksService {
	private readonly logger = new Logger(TasksService.name)

	constructor(private transactionService: TransactionService) {}

	@Interval(5 * 1000)
	async handleInterval() {
		this.logger.debug('Called every 5 seconds')
		await this.transactionService.checkPayment()
	}
}
