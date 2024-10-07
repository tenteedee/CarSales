import {ID} from "../../../../_metronic/helpers";
import {Category} from "../../category/core/models";
import {Staff} from "../../staffs/core/models";

export type News = {
    id?: ID
    title ?: string
    created_at?: string
    updated_at?: string
    category ?: Category
    posted ?: Staff
    status : boolean
}
