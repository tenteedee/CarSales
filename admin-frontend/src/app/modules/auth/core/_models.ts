export interface AuthModel {
  api_token: string
  refreshToken?: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}
export interface UserRoleModel{
  id: number,
  name : string
}
export interface UserModel {
  id: number
  username?: string
  password: string | undefined
  email: string
  fullname?: string
  phone?: string
  role?: UserRoleModel
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  auth?: AuthModel
  communication?: UserCommunicationModel
  socialNetworks?: UserSocialNetworksModel
}
