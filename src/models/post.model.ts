import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseModel } from './base.model'
import { DateTime } from '../utils/types'
import mongoose from 'mongoose'

@Schema()
export class PostModel extends BaseModel {
  @Prop({ type: DateTime })
  date: Date

  @Prop({ type: String })
  post: string

  @Prop({ type: String })
  author: string
}

export type PostDocument = PostModel & mongoose.Document
export const PostSchema = SchemaFactory.createForClass(PostModel)