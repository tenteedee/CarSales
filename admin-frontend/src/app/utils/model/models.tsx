import {ID, Response} from '../../../_metronic/helpers'

export type Filters = {
    name: string
    label: string,
    options?: any,
    type ?: string
}
export type Res = {
    id?: ID,
}
export type QueryResponse = Response<Array<Res>>;