export interface DataStoredInToken {
  id: string
  email: string
}

export class TokenData {
  access_token: string
  refresh_token: string
}