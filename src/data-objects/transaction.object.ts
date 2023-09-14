import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from '@nestjs/class-validator'

export class TransactionBuyObject {
	@ApiProperty()
	@IsNotEmpty()
	product_id: string

	@ApiProperty()
	@IsNotEmpty()
	quantity: number

	@ApiProperty()
	@IsNotEmpty()
	price: number
}

export class TransactionPaymentObject {
	@ApiProperty()
	id: string

	@ApiProperty()
	is_paid: number
}

export class TranasctionQueryObject {
	@ApiProperty({ required: false })
	product: string

	@ApiProperty({ default: 1 })
	page: number

	@ApiProperty({ default: 10 })
	limit: number
}
