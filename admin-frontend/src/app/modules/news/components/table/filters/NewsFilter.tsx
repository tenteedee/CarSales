import {useEffect, useState} from 'react';
import {Filters} from "../../../../../utils/model/models";
import {getCategories} from "../../../../category/core/requests";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";

export const NewsFiltersComponent = () => {
    const [categoryOptions, setCategoryOptions] = useState<Array<{ value: number; label: string }>>([]);
    const fetchCategoryOptions = async () => {
        try {
            const response = await getCategories("");
            if (response && response.data) {
                const categoryOptions = response.data.map((category: any) => ({
                    value: category.id,
                    label: category.name,
                }));
                return [
                    ...categoryOptions
                ];
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching category options', error);
            return [];
        }
    };

    useEffect(() => {
        const loadOptions = async () => {
            const options = await fetchCategoryOptions();
            setCategoryOptions(options);
        };
        loadOptions();
    }, []);

    const newsFilters: Array<Filters> = [
        {
            name: 'title',
            label: 'Tile',
        },
        {
            name: 'heading',
            label: 'Heading',
        },
        {
            name: 'category_id',
            label: 'Category',
            type: 'select',
            options: categoryOptions,
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                {
                    label: "Show",
                    value: 1
                },
                {
                    label: "Hide",
                    value: 0
                }
            ],
        },
    ];

    return (
        <div>
            <TableFilter filters={newsFilters}/>
        </div>
    );
};
