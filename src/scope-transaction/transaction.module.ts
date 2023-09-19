import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Transaction } from '../entities/transaction.entity'
import { Payment } from '../entities/payment.entity'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'
import { ProductModule } from '../scope-product/product.module'

@Module({
	imports: [ConfigModule, TypeOrmModule.forFeature([Transaction, Payment]), ProductModule],
	controllers: [TransactionController],
	providers: [TransactionService],
	exports: [TransactionService]
})
export class TransactionModule {}
