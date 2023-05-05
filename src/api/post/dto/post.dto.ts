import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PostDto {
  @ApiProperty()
  @IsString()
  post: string

  @ApiProperty()
  @IsString()
  author: string
}