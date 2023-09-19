import { Entity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('Payment')
export class Payment {
	@Column({ primary: true, unique: true })
	id: string

	@Column()
	transaction_id: string

	@Column({ nullable: true })
	transaction_status: string

	@Column({ nullable: true })
	status_code: string

	@Column({ nullable: true })
	status_message: string

	@Column({ nullable: true, default: '' })
	total: string

	@Column({ nullable: true })
	payment_type: string

	@Column({ nullable: true })
	print_url: string

	@Column({ nullable: true })
	transaction_time: Date

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
