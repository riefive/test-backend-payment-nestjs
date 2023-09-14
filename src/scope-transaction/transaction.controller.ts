import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { Roles } from '../middlewares/meta.role'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { RolesGuard } from '../middlewares/guard.role'
import { UserRole } from '../enums/user-role.enum'
import { TransactionBuyObject, TransactionPaymentObject, TranasctionQueryObject } from '../data-objects/transaction.object'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
	constructor(private transactionService: TransactionService) {}

	@Get('history')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiQuery({ type: TranasctionQueryObject })
	@ApiBearerAuth('JWT-auth')
	async getHistory(@Req() req: any) {
		const queries = req.query || {}
		return await this.transactionService.findAll({ ...queries, user: req.user?.id })
	}

	@Post('buying')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async postBuy(@Req() req: any, @Body() data: TransactionBuyObject) {
		return await this.transactionService.create({ ...data, user_id: req.user?.id || null })
	}

	@Post('payment')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async postPayment(@Body() data: TransactionPaymentObject) {
		const id = data?.id || ''
		const payloads = { is_paid: data?.is_paid || false, updated_at: new Date() }
		return await this.transactionService.update(id, payloads)
	}
}
