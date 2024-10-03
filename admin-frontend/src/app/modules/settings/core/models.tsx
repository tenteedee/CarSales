import {ID} from "../../../../_metronic/helpers";

export type Settings = {
    id?: ID
    name ?: string
    key ?: string
    value ?: string | File
    attribute ?: string
    type ?: string
    uploadFile?: File | null;

}