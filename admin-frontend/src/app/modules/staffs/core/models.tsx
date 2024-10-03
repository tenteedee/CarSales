import {ID} from "../../../../_metronic/helpers";
import {RoleModel} from "../../auth";

export type Staff = {
    id?: ID
    password ?: string
    email?: string
    phone_number?: string
    address?: string
    showroom?: ShowroomModel
    fullname?: string
    created_at?: string
    role?: RoleModel
    role_id?: number
    showroom_id ?: number
}
export type ShowroomModel = {
    id?: number
    name?: string
}