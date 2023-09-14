import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike } from 'typeorm'
import { Product } from '../entities/product.entity'
import { ProductEditObject, ProductObject } from '../data-objects/product.object'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<ProductObject>
	) {}

	async findAll(params: any): Promise<ProductObject[] | any> {
		const { name, page = 1, limit: perPage = 10 } = params
		const skip = perPage * page - perPage
		const options: any = { take: perPage, skip }
		if (name) {
			options.where = {
				name: ILike(`${name || ''}%`)
			}
		}
		const [data, total] = await this.productRepository.findAndCount(options)
		return { data, meta: { count: total, page, limit: perPage, pageCount: Math.ceil(total / perPage) } }
	}

	async findOne(id: string): Promise<ProductObject | null> {
		const product: any = await this.productRepository.findOneBy({ id })
		return product
	}

	async create(data: ProductEditObject): Promise<ProductObject | any> {
		try {
			return await this.productRepository.save(this.productRepository.create(data))
		} catch (error) {
			throw new HttpException({ status: HttpStatus.BAD_REQUEST, error: error.toString() }, HttpStatus.BAD_REQUEST, { cause: error })
		}
	}

	async update(id: string, data: ProductEditObject): Promise<any> {
		return await this.productRepository
			.createQueryBuilder()
			.update()
			.set({ ...data })
			.where('id = :id', { id })
			.execute()
	}

	async delete(id: string): Promise<any> {
		return await this.productRepository.createQueryBuilder().delete().from(Product).where('id = :id', { id }).execute()
	}
}
