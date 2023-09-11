import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { UserRole } from '../enums/user-role.enum'

@Entity('User')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	password: string

	@Column({ default: UserRole.USER })
	role: string
}
