import { ApiProperty } from '@nestjs/swagger'

export class RegisterResponseDto {
  @ApiProperty()
  _id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string

  @ApiProperty()
  email: string

  @ApiProperty()
  isVerified: boolean

  @ApiProperty()
  createdAt: Date
}
