import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from '../entities/product.entity'
import { ProductObject } from '../data-objects/product.object'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<ProductObject>
	) {}

	async findAll(params: any): Promise<ProductObject[] | any> {
		const { page = 1, perPage = 10 } = params
		const skip = perPage * page - perPage
		const [data, total] = await this.productRepository.findAndCount({ take: perPage, skip })
		return { data, meta: { count: total, page, limit: perPage, pageCount: Math.ceil(total / perPage) } }
	}

	async findOne(id: string): Promise<ProductObject | null> {
		const product: any = await this.productRepository.findOneBy({ id })
		return product
	}

	async create(data: ProductObject): Promise<ProductObject> {
		return await this.productRepository.save(this.productRepository.create(data))
	}

	async update(id: string, data: any): Promise<any> {
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
