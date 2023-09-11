import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Product')
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	description: string

	@Column()
	sku: string

	@Column()
	price: number

	@Column()
	image: string
}
