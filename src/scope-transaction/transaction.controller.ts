import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { Roles } from '../middlewares/meta.role'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { RolesGuard } from '../middlewares/guard.role'
import { UserRole } from '../enums/user-role.enum'
import { ParamObject } from '../data-objects/_object'
import { TransactionBuyObject, TransactionPaymentObject, TranasctionQueryObject } from '../data-objects/transaction.object'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
	constructor(private transactionService: TransactionService) {}

	@Get('token')
	async getPaymentTest() {
		return await this.transactionService.dummyPayment()
	}

	@Get('history')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiQuery({ type: TranasctionQueryObject })
	@ApiBearerAuth('JWT-auth')
	async getHistory(@Req() req: any) {
		const queries = req.query || {}
		return await this.transactionService.findAll({ ...queries, user: req.user?.userid })
	}

	@Get('detail/:id')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async getDetail(@Req() req: any, @Param() params: ParamObject) {
		const id = params.id || null
		return await this.transactionService.findOne(id)
	}

	@Post('buying')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async postBuy(@Req() req: any, @Body() data: TransactionBuyObject) {
		return await this.transactionService.create({ ...data, user: req.user, user_id: req.user?.userid || null })
	}

	@Post('payment')
	@Roles(UserRole.USER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async postPayment(@Body() data: TransactionPaymentObject) {
		return await this.transactionService.savePayment(data)
	}
}
