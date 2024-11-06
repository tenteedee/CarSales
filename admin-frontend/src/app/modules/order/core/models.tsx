import {ID} from "../../../../_metronic/helpers";
import {Car} from "../../car/core/models";
import {Customer} from "../../customer/core/models";
import {Staff} from "../../staffs/core/models";
import {Showroom} from "../../showroom/core/models";

export type Order = {
    id?: ID
    order_status?: string
    car?: Car
    customer?: Customer
    total_price?: number
    payment_price?: number
    technical_staff_id?: number
    technical_staff?: Staff
    insurance_staff_id?: number
    insurance_staff?: Staff
    sales_staff?: Staff
    sales_staff_id?: number
    showroom_id?: number
    showroom?: Showroom
    order_details?: OrderDetail[]
}
export type OrderDetail = {
    id?: ID;
    description?: string
    order_id?: number
    order?: Order
    price?: number;
};
