import {ID} from "../../../../_metronic/helpers";
import {UserModel} from "../../auth";
import {Staff} from "../../staffs/core/models";
import {Car} from "../../car/core/models";
import {Showroom} from "../../showroom/core/models";

export type TestDrive = {
    id?: ID
    customer?: UserModel
    customer_id?: ID
    sales_staff_id?: ID
    staff?: Staff
    car_id?: ID
    car?: Car
    test_drive_date?: string
    created_at?: string
    status?: string
    showroom?: Showroom
    showroom_id ?: ID
}