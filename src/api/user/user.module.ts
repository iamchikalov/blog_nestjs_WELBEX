import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel, UserSchema } from '../../models/user.model'
import { UserController } from './user.controller'

@Module({
  imports: [MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])],
  providers: [],
  controllers: [UserController],
})

export class UserModule {}