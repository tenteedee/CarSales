import {ID} from '../../../../_metronic/helpers'

export type Car = {
<<<<<<< HEAD
  id?: ID
  model?: string
  brand?: Brand
  type?: Type
  price?: number
  description?: string
  stock?: number
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
=======
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
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
