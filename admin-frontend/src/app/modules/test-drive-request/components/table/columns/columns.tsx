import {Column} from 'react-table';
import {DateFromTimestampCell} from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {TestDrive} from "../../../core/models";
import {TestDriveActionsCell} from "../cell/TestDriveActionsCell";
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import React from "react";
import {News} from "../../../../news/core/models";
import {Link} from "react-router-dom";
import {CopyTextCell} from "../../../../../../_metronic/partials/table/cell/CopyTextCell";

const testDrivesColumns: ReadonlyArray<Column<TestDrive>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return <SelectionCell id={testDrive.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Car'/>,
        id: 'car_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return (
                <>
                    <CopyTextCell value={testDrive?.car?.model}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Customer'/>,
        id: 'customer_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return (
                <>
                    <CopyTextCell value={testDrive?.customer?.fullname}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Staff'/>,
        id: 'sales_staff_id',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return (
                <>
                    <CopyTextCell value={testDrive?.staff?.fullname}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Date Request'/>,
        id: 'test_drive_date',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return (
                <>
                    <DateFromTimestampCell value={testDrive?.test_drive_date}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Created At'/>,
        id: 'created_at',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return <DateFromTimestampCell value={testDrive.created_at}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const testDrive = props.data[props.row.index] as TestDrive;
            return <TestDriveActionsCell id={testDrive.id}/>;
        },
    },
];

export {testDrivesColumns};
