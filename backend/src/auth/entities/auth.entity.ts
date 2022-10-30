import { ApiProperty } from '@nestjs/swagger'
import { AuthResult } from '../auth.service'

export class AuthResultEntity implements AuthResult {
  @ApiProperty()
  access_token!: string
}
