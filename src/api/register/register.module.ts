import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RegisterController } from './register.controller'
import { RegisterService } from './register.service'
import { RegisterConverter } from './converter/register.converter'
import { UserModel, UserSchema } from '../../models/user.model'
import { VerificationTokenModel, VerificationTokenSchema } from '../../models/verificationToken.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: VerificationTokenModel.name, schema: VerificationTokenSchema },
    ]),
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    RegisterConverter
  ],
})
export class RegisterModule {}