import {ID} from "../../../../_metronic/helpers";
import {RoleModel} from "../../auth";

export type Staff = {
    id ?: ID
    email ?: string
    phone_number ?: string
    address ?: string
    showroom ?: ShowroomModel
    fullname ?: string
    created_at : string
    role ?: RoleModel
}
export type ShowroomModel = {
    id : ID
    name : string
}