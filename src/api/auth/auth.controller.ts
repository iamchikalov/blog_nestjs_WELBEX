import { Body, Controller, Patch, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { TokenData } from './interface/auth.interface'
import { AuthDto } from './dto/auth.dto'
import { SuccessDto } from '../register/dto/success.dto'
import { RecoveryPasswordDto, SetPasswordDto } from './dto/recoveryPassword.dto'

const baseRoute = '/api/auth'

@ApiTags('Auth')
@Controller(baseRoute)
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @Post('/signIn')
  @ApiResponse({
    status: 200,
    description: 'Returns access and refresh tokens.',
    type: TokenData,
  })
  async singIn (@Body() userData: AuthDto): Promise<TokenData> {
    return await this.authService.signIn(userData)
  }

  @Post('/recovery')
  @ApiResponse({
    status: 200,
    description: 'Return recovery link status.',
    type: SuccessDto,
  })
  async sendRecoveryEmail(@Body() data: RecoveryPasswordDto): Promise<SuccessDto> {
    const recoveryUrl = 'http://blog_chikalov.com/recovery-password/'
    return await this.authService.sendRecoveryLink(data.email, recoveryUrl)
  }

  @Patch('/reset-password')
  @ApiResponse({
    status: 200,
    description: 'Return recovery password status.',
    type: SuccessDto,
  })
  async recoveryPassword(@Body() data: SetPasswordDto): Promise<SuccessDto> {
    return await this.authService.resetPassword(data)
  }
}