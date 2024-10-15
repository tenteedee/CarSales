import {useEffect, useState} from 'react';
import {Filters} from "../../../../../utils/model/models";
import {getCategories} from "../../../../category/core/requests";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";

export const TestDriveFiltersComponent = () => {
    const [carOptions, setCarOptions] = useState<Array<{ value: number; label: string }>>([]);
    const fetchCategoryOptions = async () => {
        try {
            const response = await getCategories("");
            if (response && response.data) {
                const carOptions = response.data.map((category: any) => ({
                    value: category.id,
                    label: category.name,
                }));
                return [
                    ...carOptions
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
            setCarOptions(options);
        };
        loadOptions();
    }, []);

    const newsFilters: Array<Filters> = [
        {
            name: 'id',
            label: 'Id',
        },
        {
            name: 'car_id',
            label: 'Car',
            type: 'select',
            options: carOptions,
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            options: [
                {
                    label: "Pending",
                    value: "pending"
                },
                {
                    label: "Approved",
                    value: "approved"
                },
                {
                    label: "Completed",
                    value: "completed"
                },
                {
                    label: "Cancelled",
                    value: "cancelled"
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
