import { ApiProperty } from '@nestjs/swagger'

export interface ProductObject {
	id: string
	name: string
	description: string
	sku: string
	price: number
	image: string
}

export interface ProductEditObject {
	name: string
	description: string
	sku: string
	price: number
	image: string
}

export class ProductQueryObject {
	@ApiProperty()
	id: string
}
