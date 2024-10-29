import {ID} from "../../../../_metronic/helpers";

export interface Customer {
    id?: ID
    username?: string
    password?: string | undefined
    email?: string
    fullname?: string
    phone_number?: string
    created_at?: string
    address?: string
    date_of_birth?: string
}
