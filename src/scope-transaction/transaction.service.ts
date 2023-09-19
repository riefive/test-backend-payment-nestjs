import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { differenceOfTwoDate } from '../helpers/util.timer'
import { Transaction } from '../entities/transaction.entity'
import { ProductService } from '../scope-product/product.service'
import { Snap } from 'midtrans-client'
import config from '../configs/configuration'

@Injectable()
export class TransactionService {
	private snapService

	constructor(
		@InjectRepository(Transaction)
		private transactionRepository: Repository<any>,
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
			const result = await this.transactionRepository.save(this.transactionRepository.create(data))
			return { name: product.name, ...result }
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
