import { ApiTags } from '@nestjs/swagger'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { Model } from 'mongoose'
import { UserDocument, UserModel } from '../../models/user.model'
import { InjectModel } from '@nestjs/mongoose'

const baseRoute = '/api/user'

export interface IUser {
  name: string,
  password: string,
  email: string
}

@ApiTags('User')
@Controller(baseRoute)
export class UserController {
  constructor(
    @InjectModel(UserModel.name) private readonly model: Model<UserDocument>,
  ) {}
  @Post('/')
  async createUser (@Body() user: IUser) {
    const createdUser = new this.model(user)
    return await createdUser.save()
  }

  @Get('/')
  async getAll() {
    return this.model.find()
  }
}