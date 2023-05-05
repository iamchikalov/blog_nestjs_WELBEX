import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from '../../models/user.model'
import { VerificationTokenDocument, VerificationTokenModel } from '../../models/verificationToken.model'
import { Model } from 'mongoose'
import { AuthDto } from './dto/auth.dto'
import { DataStoredInToken, TokenData } from './interface/auth.interface'
import { SuccessDto } from '../register/dto/success.dto'
import { mailer } from '../../utils/nodemailer'
import { SetPasswordDto } from './dto/recoveryPassword.dto'
import { comparePasswords } from '../../utils/compare-passwords'
import { sign } from 'jsonwebtoken'

const bcrypt = require('bcrypt')
const crypto = require('crypto')

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    @InjectModel(VerificationTokenModel.name) private readonly verificationTokenModel: Model<VerificationTokenDocument>,
  ) { }

  async signIn(userData: AuthDto): Promise<TokenData> {
    const user = await this.userModel.findOne({ email: userData.email })
    if (!user) throw new HttpException('INVALID EMAIL', HttpStatus.BAD_REQUEST)

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, user.password)
    if (!isPasswordMatching) throw new HttpException('YOUR PASSWORD NOT MATCHING', HttpStatus.FORBIDDEN)

    return this.createToken(user)
  }

  async createToken(userData: UserModel): Promise<TokenData> {
    const accessTokenData: DataStoredInToken = {
      id: userData._id,
      email: userData.email
    }
    const refreshTokenData = accessTokenData

    const secretKey: string = 'secretKey'
    const expiresIn: string = '2d'
    const accessToken = sign(accessTokenData, secretKey, { expiresIn })
    const refreshToken = sign(refreshTokenData, secretKey)

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

  async sendRecoveryLink(email: string, recoveryUrl: string): Promise<SuccessDto> {
    const user = await this.userModel.findOne({ email: email })
    if (!user) throw new HttpException(`YOUR EMAIL ${ email } NOT FOUND`, HttpStatus.BAD_REQUEST)

    const verificationTokenData = new this.verificationTokenModel

    verificationTokenData.userId = user._id
    verificationTokenData.value = crypto.randomBytes(16).toString('hex')

    await verificationTokenData.save()

    const from = 'loyce.sawayn75@ethereal.email'
    const to = user.email
    const subject = 'Account Verification Token'
    const link = `${recoveryUrl}/recoveryLink?token=${verificationTokenData.value}`
    const html = `<p>Hi ${user.email}<p><br><p>Please click on the following <a href="${link}">link</a> reset password.</p>
             <br><p>If you did not request this, please ignore this email.</p>`

    await mailer(from, to, subject, link, html)

    return { success: true }
  }

  async resetPassword(recoveryDto: SetPasswordDto): Promise<SuccessDto> {
    const token = await this.verificationTokenModel.findOne({ value: recoveryDto.tokenValue })
    if (!token) throw new HttpException('TOKEN DOES NOT EXIST', HttpStatus.NOT_FOUND)
    if (!comparePasswords(recoveryDto.newPassword, recoveryDto.confirmPassword)) {
      throw new HttpException('DIFFERENT PASSWORDS', HttpStatus.BAD_REQUEST)
    }

    const user = await this.userModel.findOne({ _id: token.userId })
    recoveryDto.newPassword = await bcrypt.hash(recoveryDto.newPassword, 10)
    await this.userModel.updateOne({ _id: user._id }, { password: recoveryDto.newPassword })
    await this.verificationTokenModel.deleteOne({ value: recoveryDto.tokenValue })

    return { success: true }
  }
}