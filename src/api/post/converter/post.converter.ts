import { PostModel } from '../../../models/post.model'
import { PostResponseDto } from '../dto/postResponse.dto'

export class PostConverter {
  async convert (data: PostModel): Promise<PostResponseDto> {
    return {
      _id: data._id,
      date: data.date,
      post: data.post,
      author: data.author,
      createdAt: data.createdAt
    }
  }

  async convertMany (data: PostModel): Promise<PostResponseDto[]> {
    const response = []
    for (const key in data) {
      response.push(key)
    }
    return response
  }
}