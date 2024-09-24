import {ID, Response} from "../../../../_metronic/helpers";

export type Staff = {
    id?: ID
    name?: string
}
export type StaffQueryResponse = Response<Array<Staff>>
