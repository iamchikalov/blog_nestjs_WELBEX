import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModel, UserSchema } from '../../models/user.model'
import { VerificationTokenModel, VerificationTokenSchema } from '../../models/verificationToken.model'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: VerificationTokenModel.name, schema: VerificationTokenSchema },
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}