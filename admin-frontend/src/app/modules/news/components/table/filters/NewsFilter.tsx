import { useState, useEffect } from 'react';
import { Filters } from "../../../../../utils/model/models";
import { getCategories } from "../../../../category/core/requests";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";

export const NewsFiltersComponent = () => {
    const [categoryOptions, setCategoryOptions] = useState<Array<{ value: number; label: string }>>([]);
    const fetchCategoryOptions = async () => {
        try {
            const response = await getCategories("");
            if (response && response.data) {
                return response.data.map((category: any) => ({
                    value: category.id,
                    label: category.name,
                }));
            } else {
                console.error('No data found in the response');
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
            setCategoryOptions(options); // Cập nhật options sau khi tải xong
        };

        loadOptions();
    }, []);

    const newsFilters: Array<Filters> = [
        {
            name: 'id',
            label: 'News Id',
        },
        {
            name: 'category_id',
            label: 'Category',
            type: 'select',
            options: categoryOptions, // Sử dụng state chứa options từ API
        },
    ];

    return (
        <div>
            <TableFilter filters={newsFilters} /> {/* Chỉ render khi newsFilters đã có */}
        </div>
    );
};
