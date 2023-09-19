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
	quantity: number

	@Column()
	total: number

	@Column({ default: 0 })
	payment_status: number

	@Column({ unique: true, nullable: true })
	token: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@Column()
	expired_at: Date
}
