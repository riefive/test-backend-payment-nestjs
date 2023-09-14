import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Transaction } from '../entities/transaction.entity'

@Injectable()
export class TransactionService {
	constructor(
		@InjectRepository(Transaction)
		private transactionRepository: Repository<any>
	) {}

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
		const product: any = await this.transactionRepository.findOneBy({ id })
		return product
	}

	async create(data: any): Promise<any | null> {
		try {
			if (data.price) {
				data.total = Number(data.price) * Number(data.quantity)
			}
			data.expired_at = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
			return await this.transactionRepository.save(this.transactionRepository.create(data))
		} catch (error) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: error.toString()
				},
				HttpStatus.BAD_REQUEST,
				{ cause: error }
			)
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
}
