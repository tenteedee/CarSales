export interface AuthModel {
    api_token: string
    refreshToken?: string
}
export interface RoleModel {
    id: number,
    name: string
}

export interface UserModel {
    id: number
    username?: string
    password?: string | undefined
    email?: string
    fullname?: string
    phone?: string
    role?: RoleModel
    pic?: string
    language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
    auth?: AuthModel
}
