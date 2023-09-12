import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsString } from '@nestjs/class-validator'

export class AuthLoginObject {
	@ApiProperty()
	@IsNotEmpty()
	@IsEmail()
	email: string

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string
}
