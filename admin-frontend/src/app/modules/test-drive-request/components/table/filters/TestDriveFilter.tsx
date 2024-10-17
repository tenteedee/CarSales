import {useEffect, useState} from 'react';
import {Filters} from "../../../../../utils/model/models";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";
import {getCars} from "../../../../car/core/requests";
import {getStaffs} from "../../../../staffs/core/requests";
import {useAuth} from "../../../../auth";

export const TestDriveFiltersComponent = () => {
    const [carOptions, setCarOptions] = useState<Array<{ value: number; label: string }>>([]);
    const [salesOptions, setSalesOptions] = useState<Array<{ value: number; label: string }>>([]);

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
    const fetchSalesOptions = async () => {
        try {
            const response = await getStaffs("search=role_id=2");
            if (response && response.data) {
                const salesOptions = response.data.map((sale: any) => ({
                    value: sale.id,
                    label: sale.fullname + " - " + sale.email,
                }));
                return [
                    ...salesOptions
                ];
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching car options', error);
            return [];
        }
    };
    const {hasRole} = useAuth()

    const loadOptions = async () => {
        const options = await fetchCarsOptions();
        setCarOptions(options);
        if (hasRole("Director")) {
            const salesOptions = await fetchSalesOptions();
            setSalesOptions(salesOptions);
        }
    };
    useEffect(() => {
        loadOptions();
    }, []);

    const newsFilters: Array<Filters> = [
        ...(hasRole("Director")
                ? [{
                    name: 'sales_staff_id',
                    label: 'Sale',
                    type: 'select',
                    options: salesOptions,
                }]
                : []
        ),
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
