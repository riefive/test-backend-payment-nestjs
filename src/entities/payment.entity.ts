import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('Payment')
export class Payment {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	transaction_id: string

	@Column()
	transaction_status: string

	@Column()
	status_code: string

	@Column()
	status_message: string

	@Column()
	total: number

	@Column()
	payment_type: string

	@Column()
	print_url: string

	@Column()
	transaction_time: Date

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
