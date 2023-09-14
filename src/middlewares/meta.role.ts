import { SetMetadata } from '@nestjs/common'
import { UserRole } from '../enums/user-role.enum'

export const Roles = (...role: UserRole[]) => SetMetadata('roles', role)
