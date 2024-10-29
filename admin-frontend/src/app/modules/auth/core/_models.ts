import {ID} from "../../../../_metronic/helpers";

export interface AuthModel {
    api_token: string
    refreshToken?: string
}

export interface RoleModel {
    id: number,
    name: string
}

export interface UserModel {
    id?: ID
    username?: string
    password?: string | undefined
    email?: string
    fullname?: string
    phone_number?: string
    role: RoleModel
    pic?: string
    language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
    auth: AuthModel
    created_at?: string
    address?: string
    date_of_birth?: string
}
