import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserDocument, UserModel } from '../../models/user.model'
import { PostDocument, PostModel } from '../../models/post.model'
import { Model } from 'mongoose'
import { PostDto } from './dto/post.dto'
import { PostResponseDto } from './dto/postResponse.dto'
import { PostConverter } from './converter/post.converter'
import { SuccessDto } from '../register/dto/success.dto'

@Injectable()
export class PostService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(PostModel.name) private readonly postModel: Model<PostDocument>,
    private readonly converter: PostConverter
  ) { }

  async createPost(userId: string, postData: PostDto): Promise<PostResponseDto> {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) throw new HttpException('INVALID USER', HttpStatus.BAD_REQUEST)

    const data: PostDto = {
      post: postData.post,
      author: user.name,
    }
    const newPost = new this.postModel(data)
    const responsePost = await newPost.save()
    return await this.converter.convert(responsePost)
  }

  async pagination(documentsToSkip = 0, limitOfDocuments?: number) {
    const query = this.postModel
      .find()
      .skip(documentsToSkip)

    if (limitOfDocuments) {
      query.limit(limitOfDocuments)
    }
    const results = await query
    const count = await this.postModel.count()

    return { results, count }
  }

  async getPosts(userId: string) {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) throw new HttpException('INVALID USER', HttpStatus.BAD_REQUEST)

    return this.postModel.find({ author: user.name })
  }

  async getPostById(postId: string):Promise<PostResponseDto> {
    const post = await this.postModel.findOne({ _id: postId })
    return await this.converter.convert(post)
  }

  async updatePost(userId: string, postId: string, postData: PostDto): Promise<PostResponseDto> {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) throw new HttpException('INVALID USER', HttpStatus.BAD_REQUEST)

    const data: PostDto = {
      post: postData.post,
      author: user.name,
    }
    this.postModel.updateOne({ _id: postId },  data)
    const updatedPost = await this.postModel.findOne({ _id: postId })
    return await this.converter.convert(updatedPost)
  }

  async deletePost(userId: string, postId: string): Promise<SuccessDto> {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) throw new HttpException('INVALID USER', HttpStatus.BAD_REQUEST)

    await this.postModel.deleteOne({ _id: postId })
    return { success: true }
  }
}