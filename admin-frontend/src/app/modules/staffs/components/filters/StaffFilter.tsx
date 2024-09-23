import {Filters} from "../../../../utils/model/models";

export const staffFilters: Array<Filters> = [
    {
        name: 'id',
        label: 'Mã đơn hàng',
    },
    {
        name: 'tran_id',
        label: 'Mã giao dịch',
    },
    {
        name: 'name',
        label: 'Người gửi',
    },
    {
        name: 'phone',
        label: 'Số điện thoại',
    },
    {
        name: 'user,username',
        label: 'Khách hàng',
    },
    {
        name: 'message',
        label: 'Nội dung',
    },
    {
        name: 'status',
        label: 'Trạng thái',
        type: 'select',
        options: [
            {
                value: 0,
                label: 'Đang chờ',
            },
            {
                value: 1,
                label: 'Thành công',
            },
        ],
    },
]