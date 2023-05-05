import { PostService } from './post.service'
import { Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { PostResponseDto } from './dto/postResponse.dto'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { PostDto } from './dto/post.dto'
import { AuthGuard } from '../auth/guards/jwt-auth.guard'
import { PostIdDto } from './dto/postId.dto'
import { SuccessDto } from '../register/dto/success.dto'
import { PaginationParams } from '../../types/paginationParams'

const baseRoute = '/api/post'

@ApiTags('Post')
@Controller(baseRoute)
export class PostController {
  constructor(
    private readonly postService: PostService
  ) { }

  @Post('/create')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Returns new post',
    type: PostResponseDto
  })
  async createPost(@Req() req: any, @Body() data: PostDto) {
    return await this.postService.createPost(req.user.id, data)
  }

  @Get('pagination')
  async pagination(@Query() { skip, limit }: PaginationParams ) {
    return await this.postService.pagination(skip, limit)
  }

  @Get('getAll')
  @UseGuards(AuthGuard)
  async getPosts(@Req() req: any) {
    return await this.postService.getPosts(req.user.id)
  }

  @Get('getById')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Returns post',
    type: PostResponseDto
  })
  async getPostById(@Body() data: PostIdDto) {
    return await this.postService.getPostById(data.id)
  }

  @Patch('update')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Returns updated post',
    type: PostResponseDto
  })
  async updatePost(@Req() req: any, @Body() postId: PostIdDto, @Body() data: PostDto) {
    console.log('USER ID: ', req.user.id)
    console.log('POST ID: ', postId)
    console.log('DATA: ', data)
    return await this.postService.updatePost(req.user.id, postId.id, data)
  }

  @Delete('delete')
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Return true',
    type: SuccessDto
  })
  async deletePost(@Req() req: any, @Body() postId: PostIdDto) {
    return await this.postService.deletePost(req.user.id, postId.id)
  }
}