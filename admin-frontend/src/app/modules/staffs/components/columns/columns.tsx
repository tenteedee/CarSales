import {Column} from 'react-table'
import {CopyTextCell} from '../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../_metronic/partials/table/header/TableHeader';
import {Staff} from "../../core/models";
import {DateFromTimestampCell} from "../../../../../_metronic/partials/table/cell/DateFromTimestampCell";

const staffsColumns: ReadonlyArray<Column<Staff>> = [
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID'/>,
        id: 'id',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].id}`}/>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Full Name'/>,
        id: 'fullname',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].fullname}`}/>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Email'/>,
        id: 'email',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].email}`}/>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Phone'/>,
        id: 'phone_number',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].phone_number}`}/>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Address'/>,
        id: 'address',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].address}`}/>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Role'/>,
        id: 'role.name',
        Cell: ({...props}) => (
            <div className='text-primary font-weight-bold mt-1'>
                {props.data[props.row.index].role.name}
            </div>
        ),
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Created At'/>,
        Cell: ({...props}) => (
            <DateFromTimestampCell value={`${props.data[props.row.index].created_at}`}/>
        ),
        id: 'created_at',
    },
]

export {staffsColumns}
