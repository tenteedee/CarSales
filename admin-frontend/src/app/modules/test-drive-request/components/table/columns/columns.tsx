import {Column} from 'react-table';
import {DateFromTimestampCell} from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {TestDrive} from "../../../core/models";
import {TestDriveActionsCell} from "../cell/TestDriveActionsCell";
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import React from "react";

const testDrivesColumns: ReadonlyArray<Column<TestDrive>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const staff = props.data[props.row.index] as TestDrive;
            return <SelectionCell id={staff.id}/>;
        },
    },

    {
        Header: (props) => <TableHeader tableProps={props} title='Created At'/>,
        id: 'created_at',
        Cell: ({...props}) => {
            const staff = props.data[props.row.index] as TestDrive;
            return <DateFromTimestampCell value={staff.created_at}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const staff = props.data[props.row.index] as TestDrive;
            return <TestDriveActionsCell id={staff.id}/>;
        },
    },
];

export {testDrivesColumns};
