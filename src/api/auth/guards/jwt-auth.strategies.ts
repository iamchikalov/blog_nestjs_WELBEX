import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from '../../../models/user.model'
import { Model } from 'mongoose'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectModel(UserModel.name) private repository: Model<UserModel>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    })
  }

  async validate (payload: any) {
    return this.repository.findOne({ _id: payload._id })
  }
}