import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { differenceOfTwoDate } from '../helpers/util.timer'
import { Transaction } from '../entities/transaction.entity'
import { Payment } from '../entities/payment.entity'
import { ProductService } from '../scope-product/product.service'
import { Snap } from 'midtrans-client'
import config from '../configs/configuration'

@Injectable()
export class TransactionService {
	private snapService

	constructor(
		@InjectRepository(Transaction) private transactionRepository: Repository<any>,
		@InjectRepository(Payment) private paymentRepository: Repository<any>,
		private productService: ProductService
	) {
		const configs = config()
		this.snapService = new Snap({
			isProduction: false,
			serverKey: configs?.midtrans?.server_key,
			clientKey: configs?.midtrans?.client_key
		})
	}

	async findAll(params: any): Promise<any | null> {
		const { user, product, page = 1, limit: perPage = 10 } = params
		const skip = perPage * page - perPage
		const options: any = { where: {}, take: perPage, skip }
		if (user) {
			options.where = { ...options.where, user_id: user }
		}
		if (product) {
			options.where = { ...options.where, product_id: product }
		}
		const [data, total] = await this.transactionRepository.findAndCount(options)
		return { data, meta: { count: total, page, limit: perPage, pageCount: Math.ceil(total / perPage) } }
	}

	async findOne(id: string): Promise<any | null> {
		const trans: any = await this.transactionRepository.findOneBy({ id })
		let output = {}
		if (trans) {
			output = trans
			const product: any = await this.productService.findOne(trans.product_id)
			if (product) {
				output = { ...output, name: product.name, price: product.price }
			}
		}
		return output
	}

	async create(data: any): Promise<any | null> {
		try {
			const product: any = await this.productService.findOne(data.product_id)
			const user: any = data?.user || {}
			if (!product || Number(data.quantity) < 1) {
				throw new Error(HttpStatus.UNPROCESSABLE_ENTITY.toString())
			}
			const trans: any = await this.transactionRepository.findOneBy({ user_id: data.user_id, product_id: data.product_id })
			if (trans) {
				const diff = differenceOfTwoDate(trans.created_at, new Date(), 'minute')
				if (diff < 15) {
					throw new Error(HttpStatus.CONFLICT.toString())
				}
			}
			if (data.price || product.price) {
				data.total = Number(data.price || product.price) * Number(data.quantity)
			}
			data.expired_at = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
			data.payment_status = 0
			const result = await this.transactionRepository.save(this.transactionRepository.create(data))
			let resultExternal: any = {}
			if (result) {
				const parameters = {
					transaction_details: {
						order_id: result.id,
						gross_amount: data.total
					},
					item_details: [
						{
							id: product.id,
							name: product.name,
							price: product.price,
							quantity: data.quantity
						}
					],
					customer_details: {
						user_id: user?.user_id || '',
						name: user?.name || '',
						email: user?.email || '',
						phone: '08123456789'
					}
				}
				resultExternal = await this.snapService.createTransaction(parameters)
				if (resultExternal) await this.update(result.id, { token: resultExternal?.token })
			}
			return { name: product.name, ...result, token: resultExternal?.token }
		} catch (error) {
			let errorCode: any = HttpStatus.INTERNAL_SERVER_ERROR
			let errorMessage = error.toString() || 'Internal Server Error'
			const errorString = error.toString()
			if (errorString === 'Error: 409') {
				errorCode = HttpStatus.CONFLICT
				errorMessage = 'Duplicate transaction'
			}
			if (errorString === 'Error: 422') {
				errorCode = HttpStatus.UNPROCESSABLE_ENTITY
				errorMessage = 'Attributes not valid'
			}
			throw new HttpException({ status: errorCode, error: errorMessage }, errorCode, { cause: error })
		}
	}

	async update(id: string, data: any): Promise<any> {
		return await this.transactionRepository
			.createQueryBuilder()
			.update()
			.set({ ...data })
			.where('id = :id', { id })
			.execute()
	}

	async savePayment(data: any): Promise<any> {
		const transId = data?.transaction_id || null
		if (!transId) {
			throw new HttpException({ status: HttpStatus.NOT_FOUND, error: 'Not Found' }, HttpStatus.NOT_FOUND)
		}
		const payment: any = await this.paymentRepository.findOneBy({ transaction_id: transId })
		let result = null
		if (!data.id || data.id?.trim() === '') delete data.id
		if (Number(data.total || 0) === 0) delete data.total
		if (!data.status_message || data.status_message?.trim() === '') delete data.status_message
		if (payment) {
			await this.paymentRepository
				.createQueryBuilder()
				.update()
				.set({ ...data })
				.where('id = :id', { id: payment.id })
				.execute()
			result = { ...payment, ...data }
		} else {
			result = await this.paymentRepository.save(this.paymentRepository.create(data))
		}
		let paymentStatus = 0
		if (data.transaction_status === 'pending') paymentStatus = 1
		if (data.transaction_status === 'success' || data.status_code === '406') paymentStatus = 2
		if (transId) {
			await this.update(transId, { payment_status: paymentStatus, updated_at: new Date() })
		}
		return result
	}

	async dummyPayment(): Promise<any> {
		const parameters = {
			transaction_details: {
				order_id: 'test-transaction-123',
				gross_amount: 200000
			}
		}
		const result = await this.snapService.createTransaction(parameters)
		return result
	}
}
