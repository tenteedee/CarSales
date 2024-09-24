import {ID} from "../../../../_metronic/helpers";
import {RoleModel} from "../../auth";

export type Staff = {
    id?: ID
    name?: string
    created_at : string
    role ?: RoleModel
}
