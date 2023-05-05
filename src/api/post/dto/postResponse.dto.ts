import { ApiProperty } from '@nestjs/swagger'

export class PostResponseDto {
  @ApiProperty()
  _id: string

  @ApiProperty()
  date: Date

  @ApiProperty()
  post: string

  @ApiProperty()
  author: string

  @ApiProperty()
  createdAt: Date
}