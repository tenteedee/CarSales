import {Response} from '../../../_metronic/helpers'

export type Filters = {
    name: string
    label: string,
    options?: any,
    type ?: string
}
export type Res = {

}
export type QueryResponse = Response<Array<Res>>;