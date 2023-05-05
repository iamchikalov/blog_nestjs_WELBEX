import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseModel } from './base.model'
import * as mongoose from 'mongoose'

@Schema()
export class UserModel extends BaseModel{
  @Prop({ required: true, type: String })
  name!: string

  @Prop({ required: true, type: String })
  password!: string

  @Prop({ required: true, type: String })
  email!: string

  @Prop({ default: false, required: true, type: Boolean })
  isVerified: boolean
}

export type UserDocument = UserModel & mongoose.Document
export const UserSchema = SchemaFactory.createForClass(UserModel)