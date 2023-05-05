import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel, UserSchema } from '../../models/user.model'
import { PostModel, PostSchema } from '../../models/post.model'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostConverter } from './converter/post.converter'
import { JwtService } from '@nestjs/jwt'



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: PostModel.name, schema: PostSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostConverter,
    JwtService
  ],
})
export class PostModule {}