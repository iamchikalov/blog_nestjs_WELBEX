import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { BaseDto } from '../../../types/base.dto'

export class RegisterDto extends BaseDto {
  @ApiProperty()
  @IsString()
  name!: string

  @ApiProperty()
  @IsString()
  email!: string

  @ApiProperty()
  @IsString()
  password!: string
}
