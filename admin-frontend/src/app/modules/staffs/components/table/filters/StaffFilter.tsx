import {Filters} from "../../../../../utils/model/models";

export const staffFilters: Array<Filters> = [
    {
        name: 'id',
        label: 'Staff ID',
    },
    {
        name: 'fullname',
        label: 'Name',
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'phone_number',
        label: 'Phone',
    },
    {
        name: 'role_id',
        label: 'Role',
        type: 'select',
        options: [
            {
                value: "",
                label: 'Chọn role',
            },
            {
                value: 1,
                label: 'Technical',
            },
            {
                value: 2,
                label: 'Sale',
            },
            {
                value: 3,
                label: "Insurance"
            },
            {
                value: 4,
                label: "Director"
            }
        ],
    },

]