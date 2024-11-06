import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import {OrderActionsCell} from "../cell/OrderActionsCell";
import {Order} from '../../../core/models';
import React from "react";
import {numberFormat} from "../../../../../utils/helpers/helpers";

const orderColumns: ReadonlyArray<Column<Order>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Order;
            return <SelectionCell id={insurance.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID'/>,
        id: 'id',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Order;
            return <CopyTextCell className='text-dark' value={`${insurance.id}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Customer'/>,
        id: 'customer_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <div className='d-flex flex-column'>
                        <div className='d-flex flex-column'>
                            <CopyTextCell value={testDrive?.customer?.fullname}/>
                        </div>
                        <CopyTextCell value={testDrive?.customer?.phone_number}/>
                    </div>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Car'/>,
        id: 'car_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <CopyTextCell value={testDrive?.car?.model}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Total Price'/>,
        id: 'total_price',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <span className={`badge bg-success text-white`}>
                        <CopyTextCell value={numberFormat(testDrive?.total_price)}/>
                    </span>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Total Price'/>,
        id: 'payment_price',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <span className={`badge bg-success text-white`}>
                        <CopyTextCell value={numberFormat(testDrive?.payment_price)}/>
                    </span>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Showroom'/>,
        id: 'showroom_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <span className={`badge bg-primary text-white`}>
                        <CopyTextCell value={(testDrive?.showroom?.name)}/>
                    </span>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Technical Staff'/>,
        id: 'technical_staff_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <CopyTextCell value={testDrive?.technical_staff?.fullname}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Insurance Staff'/>,
        id: 'insurance_staff_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <CopyTextCell value={testDrive?.insurance_staff?.fullname}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Sale Staff'/>,
        id: 'sales_staff_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            return (
                <>
                    <CopyTextCell value={testDrive?.sales_staff?.fullname}/>
                </>
            )
        },
    },

    {
        Header: (props) => <TableHeader tableProps={props} title='Status'/>,
        id: 'status',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as Order
            let status = ''
            let label = ''
            switch (testDrive.order_status) {
                case 'pending': {
                    status = 'warning'
                    label = 'Pending'
                    break
                }
                case 'paying': {
                    status = 'primary'
                    label = 'Paying'
                    break
                }
                case 'confirmed': {
                    status = 'primary'
                    label = 'Approved'
                    break
                }
                case 'completed': {
                    status = 'success'
                    label = 'Completed'
                    break
                }
                case 'cancelled': {
                    status = 'danger'
                    label = 'Cancelled'
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
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Order;
            return <OrderActionsCell id={insurance.id}/>;
        },
    },
];

export {orderColumns};
