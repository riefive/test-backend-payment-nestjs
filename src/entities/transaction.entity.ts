import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Transaction')
export class Transaction {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	user_id: string

	@Column()
	product_id: string

	@Column()
	quanity: number

	@Column()
	total: number
}
