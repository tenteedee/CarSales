import {Filters} from "../../../../../utils/model/models";

export const newsFilters: Array<Filters> = [
    {
        name: 'id',
        label: 'News Id',
    },
    {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        options: [
            {
                value: 4,
                label: 'Technical',
            },
            {
                value: 2,
                label: 'Technical 2',
            },

        ],
    },
]