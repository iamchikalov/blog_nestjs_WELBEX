import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from '../api/user/user.module'
import { ConfigModule } from '@nestjs/config'
import { RegisterModule } from '../api/register/register.module'
import { AuthModule } from '../api/auth/auth.module'
import { PostModule } from '../api/post/post.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MongoUrl),
    UserModule,
    RegisterModule,
    AuthModule,
    PostModule
  ],
  providers: [],
})
export class AppModule {}