import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from '@nestjs/class-validator'

export interface ProductObject {
	id: string
	name: string
	description: string
	sku: string
	price: number
	image: string
}

export class ProductListObject {
	@ApiProperty({ required: false })
	name: string

	@ApiProperty({ default: 1 })
	page: number

	@ApiProperty({ default: 10 })
	limit: number
}

export class ProductEditObject {
	@ApiProperty()
	@IsNotEmpty()
	name: string

	@ApiProperty()
	description: string

	@ApiProperty()
	sku: string

	@ApiProperty()
	@IsNotEmpty()
	price: number

	@ApiProperty()
	image: string
}
