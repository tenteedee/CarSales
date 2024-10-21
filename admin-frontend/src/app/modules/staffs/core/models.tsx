import {ID} from "../../../../_metronic/helpers";
import {RoleModel} from "../../auth";
import {Showroom} from "../../showroom/core/models";

export type Staff = {
    id?: ID
    password ?: string
    email?: string
    phone_number?: string
    address?: string
    showroom?: Showroom
    fullname?: string
    created_at?: string
    role?: RoleModel
    role_id?: number
    avatar_url ?: string
    showroom_id ?: number
}
