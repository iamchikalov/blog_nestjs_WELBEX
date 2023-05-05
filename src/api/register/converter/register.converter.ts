import { UserModel } from '../../../models/user.model'
import { RegisterResponseDto } from '../dto/registerResponse.dto'

export class RegisterConverter {
  async convert (data: UserModel): Promise<RegisterResponseDto> {
    return {
      _id: data._id,
      name: data.name,
      password: data.password,
      email: data.email,
      isVerified: data.isVerified,
      createdAt: data.createdAt
    }
  }

  async convertMany (data: UserModel): Promise<RegisterResponseDto[]> {
    const response = []
    for (const key in data) {
      response.push(key)
    }
    return response
  }
}
