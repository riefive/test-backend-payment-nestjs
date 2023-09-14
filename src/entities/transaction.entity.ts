import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

	@Column({ default: false })
	isPaid: boolean

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
