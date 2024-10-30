import {ID} from "../../../../_metronic/helpers";
import {Car} from "../../car/core/models";
import {Customer} from "../../customer/core/models";

export type Order = {
    id?: ID
    order_status ?: string
    car?: Car
    customer ?: Customer
    total_price?: number
}
