import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {DateFromTimestampCell} from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {CustomerActionsCell} from "../cell/CustomerActionsCell";
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import React from "react";
import {Customer} from "../../../core/models";

const customersColumns: ReadonlyArray<Column<Customer>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <SelectionCell id={customer.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title={"Full Name"}/>,
        id: 'fullname',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <CopyTextCell value={customer.fullname}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title={"Email"}/>,
        id: 'email',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <CopyTextCell value={customer.email}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title={"Phone"}/>,
        id: 'phone_number',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <CopyTextCell value={customer.phone_number}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title={"Address"}/>,
        id: 'address',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <CopyTextCell value={customer.address}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title={"Date of birth"}/>,
        id: 'date_of_birth',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <DateFromTimestampCell value={customer.date_of_birth}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Created At'/>,
        id: 'created_at',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <DateFromTimestampCell value={customer.created_at}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const customer = props.data[props.row.index] as Customer;
            return <CustomerActionsCell id={customer.id}/>;
        },
    },
];

export {customersColumns};
