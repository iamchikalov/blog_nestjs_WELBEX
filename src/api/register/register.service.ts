import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { UserModel } from '../../models/user.model'
import { Model } from 'mongoose'
import { VerificationTokenDocument, VerificationTokenModel } from '../../models/verificationToken.model'
import { RegisterConverter } from './converter/register.converter'
import { RegisterResponseDto } from './dto/registerResponse.dto'
import { RegisterDto } from './dto/register.dto'
import { isValidEmail } from '../../utils/validEmail'
import { mailer } from '../../utils/nodemailer'
import { SuccessDto } from './dto/success.dto'
import { VerificationTokenDto } from './dto/verificationToken.dto'

const bcrypt = require('bcrypt')
const crypto = require('crypto')

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    @InjectModel(VerificationTokenModel.name) private readonly verificationTokenModel: Model<VerificationTokenDocument>,
    private readonly converter: RegisterConverter
  ) { }

  async createAccount (doc: RegisterDto, verificationLink: string): Promise<RegisterResponseDto> {
    if (!isValidEmail(doc.email)) throw new HttpException('INVALID EMAIL', HttpStatus.BAD_REQUEST)
    doc.password = await bcrypt.hash(doc.password, 10)

    const newUser = new this.userModel(doc)
    const responseUser = await newUser.save()
    await this.sendVerificationLink(doc, verificationLink)
    return await this.converter.convert(responseUser)
  }

  private async sendVerificationLink (creator: RegisterDto, verifyUrl: string): Promise<SuccessDto> {
    const user = await this.userModel.findOne({ email: creator.email })
    if (!user) throw new HttpException('INVALID EMAIL', HttpStatus.BAD_REQUEST)

    const verificationTokenData = new this.verificationTokenModel
    verificationTokenData.userId = user._id
    verificationTokenData.value = crypto.randomBytes(16).toString('hex')
    await verificationTokenData.save()

    const from = 'loyce.sawayn75@ethereal.email'
    const to = user.email
    const subject = 'Account Verification Token'
    const link = `${verifyUrl}/verifyLink?token=${verificationTokenData.value}`
    const html = `<p>Hi ${creator.email}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p>
             <br><p>If you did not request this, please ignore this email.</p>`
    await mailer(from, to, subject, link, html)

    return { success: true }
  }

  async verifyAccount (token: VerificationTokenDto) {
    const verificationToken = await this.verificationTokenModel.findOne({ value: token.value })
    if (verificationToken == null) throw new HttpException('ACCOUNT ALREADY VERIFIED', HttpStatus.OK)

    if (token.value === verificationToken.value) {
      const user = await this.userModel.findOne({ _id: verificationToken.userId })
      user.isVerified = true
      await this.userModel.updateOne({ email: user.email }, { isVerified: user.isVerified })
      await this.verificationTokenModel.deleteOne({ value: token.value })
      return { success: true }
    } else throw new HttpException('TOKEN DOES NOT EXIST', HttpStatus.NOT_FOUND)
  }
}