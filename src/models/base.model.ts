import { Prop, Schema } from '@nestjs/mongoose'
import { DateTime, id } from '../utils/types'

@Schema({ timestamps: true })
export class BaseModel {
  @Prop(id)
  _id!: string

  @Prop(DateTime)
  createdAt: Date

  @Prop()
  updatedAt: Date
}