import {useEffect, useState} from 'react';
import {Filters} from "../../../../../utils/model/models";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";
import {getCars} from "../../../../car/core/requests";

export const TestDriveFiltersComponent = () => {
    const [carOptions, setCarOptions] = useState<Array<{ value: number; label: string }>>([]);
    const fetchCarsOptions = async () => {
        try {
            const response = await getCars("");
            if (response && response.data) {
                const carOptions = response.data.map((car: any) => ({
                    value: car.id,
                    label: car.model,
                }));
                return [
                    ...carOptions
                ];
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching car options', error);
            return [];
        }
    };

    useEffect(() => {
        const loadOptions = async () => {
            const options = await fetchCarsOptions();
            setCarOptions(options);
        };
        loadOptions();
    }, []);

    const newsFilters: Array<Filters> = [
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
