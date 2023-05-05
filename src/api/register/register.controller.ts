import { Body, Controller, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { RegisterService } from './register.service'
import { RegisterResponseDto } from './dto/registerResponse.dto'
import { RegisterDto } from './dto/register.dto'
import { SuccessDto } from './dto/success.dto'
import { VerificationTokenDto } from './dto/verificationToken.dto'

const baseRoute = '/api/register'

@ApiTags('Register')
@Controller(baseRoute)
export class RegisterController {
  constructor(
    private registerService: RegisterService
  ) { }

  @Post('')
  @ApiResponse({
    status: 200,
    description: 'Returns registered user data.',
    type: RegisterResponseDto
  })
  async registerUser (@Body() userData: RegisterDto): Promise<RegisterResponseDto> {
    const verifyLink = 'http://blog_chikalov.com/verify-account/'
    return this.registerService.createAccount(userData, verifyLink)
  }

  @Patch('/verify')
  @ApiResponse({
    status: 200,
    description: 'Returns verify account status',
    type: SuccessDto
  })
  async verify(@Body() token: VerificationTokenDto): Promise<SuccessDto> {
    return await this.registerService.verifyAccount(token)
  }
}