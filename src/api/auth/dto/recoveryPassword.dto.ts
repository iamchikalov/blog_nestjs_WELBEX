import { ApiProperty, PartialType, PickType } from '@nestjs/swagger'
import { AuthDto } from './auth.dto'
import { IsString } from 'class-validator'

export class RecoveryPasswordDto extends PickType(PartialType(AuthDto), ['email']) { }
export class SetPasswordDto {
  @ApiProperty()
  @IsString()
  tokenValue: string

  @ApiProperty()
  @IsString()
  newPassword: string

  @ApiProperty()
  @IsString()
  confirmPassword: string
}
