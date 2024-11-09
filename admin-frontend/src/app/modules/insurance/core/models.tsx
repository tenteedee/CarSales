import {ID} from "../../../../_metronic/helpers";

export type InsuranceProvider = {
    id?: ID
    name ?: string
    phone_number ?: string
    email ?: string
    created_at?: string
    updated_at?: string
}
export type Insurance = {
    id?: ID
    name ?: string
    description?: string
    insurance_provider_id ?: number
    provider ?: InsuranceProvider
    type?: number
    type_price?: number
    price?: number
    created_at?: string
    updated_at?: string
}