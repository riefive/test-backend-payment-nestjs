import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from '../entities/transaction.entity'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'
import { ProductModule } from '../scope-product/product.module'

@Module({
	imports: [TypeOrmModule.forFeature([Transaction]), ProductModule],
	controllers: [TransactionController],
	providers: [TransactionService],
	exports: [TransactionService]
})
export class TransactionModule {}
