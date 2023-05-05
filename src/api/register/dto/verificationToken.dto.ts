import { BaseDto } from '../../../types/base.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class VerificationTokenDto extends BaseDto {
  @ApiProperty()
  @IsString()
  value: string
}
