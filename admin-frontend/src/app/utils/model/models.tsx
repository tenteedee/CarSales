import {ID, Response} from '../../../_metronic/helpers'

export type Filters = {
    name: string
    label: string,
    options?: any,
    type ?: string
}
export type QueryResponse = Response<Array<any>>;