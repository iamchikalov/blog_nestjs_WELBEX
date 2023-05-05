import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseModel } from './base.model'
import mongoose from 'mongoose'

@Schema()
export class VerificationTokenModel extends BaseModel {
  @Prop()
  userId!: string

  @Prop()
  value!: string
}

export type VerificationTokenDocument = VerificationTokenModel & mongoose.Document
export const VerificationTokenSchema = SchemaFactory.createForClass(VerificationTokenModel)
