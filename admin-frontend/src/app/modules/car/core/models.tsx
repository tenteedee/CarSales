import {ID} from '../../../../_metronic/helpers'

export type Car = {
    id?: ID
    model?: string
    brand?: Brand
    brand_id?:number
    type_id?:number
    type?: Type
    price?: number
    description?: string
    stock?: number
    content?: string
    images?: string[]
}
export type Brand = {
    id?: string
    name?: string
}
export type Type = {
    id?: string
    name?: string
}