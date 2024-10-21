import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import {ShowroomActionsCell} from "../cell/ShowroomActionsCell";
import {Showroom} from "../../../core/models";

const showroomColumns: ReadonlyArray<Column<Showroom>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <SelectionCell id={category.id}/>;
        },
    },

    {
        Header: (props) => <TableHeader tableProps={props} title='Name'/>,
        id: 'name',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <CopyTextCell className='text-dark' value={`${category.name}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Phone'/>,
        id: 'phone_number',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <CopyTextCell className='text-dark' value={`${category.phone_number}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Email'/>,
        id: 'email',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <CopyTextCell className='text-dark' value={`${category.email}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Address'/>,
        id: 'address',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <CopyTextCell className='text-dark' value={`${category.address}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Showroom;
            return <ShowroomActionsCell id={category.id}/>;
        },
    },
];

export {showroomColumns};
