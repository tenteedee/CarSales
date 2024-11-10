import { Column } from 'react-table';
import { CopyTextCell } from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import { TableHeader } from '../../../../../../_metronic/partials/table/header/TableHeader';
import { SelectionHeader } from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import { SelectionCell } from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import { InsuranceProviderActionsCell } from "../cell/InsuranceProviderActionsCell";
import { Insurance, InsuranceProvider } from '../../../core/models';
import React from "react";
import { numberFormat } from "../../../../../utils/helpers/helpers";
import { InsuranceActionsCell } from '../cell/InsuranceActionsCell';

const insuranceColumns: ReadonlyArray<Column<Insurance>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props} />,
        id: 'selection',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <SelectionCell id={insurance.id} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID' />,
        id: 'id',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.id}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Name' />,
        id: 'name',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.name}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Description' />,
        id: 'description',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.description}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Provider' />,
        id: 'insurance_provider_id',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.provider?.name}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Type' />,
        id: 'type',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance
            let status = ''
            let label = ''
            switch (insurance.type) {
                case 1: {
                    status = 'success'
                    label = 'Bắt buộc'
                    break
                }
                case 2: {
                    status = 'danger'
                    label = 'Thân vỏ'
                    break
                }
            }
            return (
                <>
                    <span className={`badge bg-${status} text-white`}>{label}</span>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Price' />,
        id: 'price',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance
            let status = ''
            let label = ''
            switch (insurance.type_price) {
                case 1: {
                    status = 'success'
                    label = 'Cố định'
                    break
                }
                case 2: {
                    status = 'danger'
                    label = '% giá xe'
                    break
                }
            }
            return (
                <>
                    <span className={`badge bg-${status} text-white`}>{label} - {numberFormat(insurance.price)}</span>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions' />,
        id: 'actions',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <InsuranceActionsCell id={insurance.id} />;
        },
    },
];


const insuranceProviderColumns: ReadonlyArray<Column<InsuranceProvider>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props} />,
        id: 'selection',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <SelectionCell id={insurance.id} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID' />,
        id: 'id',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <CopyTextCell className='text-dark' value={`${insurance.id}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Name' />,
        id: 'name',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <CopyTextCell className='text-dark' value={`${insurance.name}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Phone' />,
        id: 'phone_number',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <CopyTextCell className='text-dark' value={`${insurance.phone_number}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Email' />,
        id: 'email',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <CopyTextCell className='text-dark' value={`${insurance.email}`} />;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions' />,
        id: 'actions',
        Cell: ({ ...props }) => {
            const insurance = props.data[props.row.index] as InsuranceProvider;
            return <InsuranceProviderActionsCell id={insurance.id} />;
        },
    },
];

export { insuranceProviderColumns, insuranceColumns };