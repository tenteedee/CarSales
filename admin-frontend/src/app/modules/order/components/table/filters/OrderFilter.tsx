import {useEffect, useState} from 'react';
import {Filters} from "../../../../../utils/model/models";
import {TableFilter} from "../../../../../../_metronic/partials/table/filter/TableFilter";
import {getCars} from "../../../../car/core/requests";
import {getStaffs} from "../../../../staffs/core/requests";
import {useAuth} from "../../../../auth";

export const OrderFiltersComponent = () => {
    const [carOptions, setCarOptions] = useState<Array<{ value: number; label: string }>>([]);
    const [salesOptions, setSalesOptions] = useState<Array<{ value: number; label: string, role_id : number }>>([]);

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
            const response = await getStaffs("");
            if (response && response.data) {
                const salesOptions = response.data.map((sale: any) => ({
                    value: sale.id,
                    label: sale.fullname + " - " + sale.email,
                    role_id : sale.role_id
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
                    options: salesOptions.filter(option => option.role_id === 2),
                }]
                : []
        ),
        ...(hasRole("Director")
                ? [{
                    name: 'technical_staff_id',
                    label: 'Technical',
                    type: 'select',
                    options: salesOptions.filter(option => option.role_id === 1),
                }]
                : []
        ),
        ...(hasRole("Director")
                ? [{
                    name: 'insurance_staff_id',
                    label: 'Insurance',
                    type: 'select',
                    options: salesOptions.filter(option => option.role_id === 3),
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
            name: 'order_status',
            label: 'Status',
            type: 'select',
            options: [
                {
                    label: "Pending",
                    value: "pending"
                },
                {
                    label: "Paying",
                    value: "paying"
                },
                {
                    label: "Confirmed",
                    value: "confirmed"
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