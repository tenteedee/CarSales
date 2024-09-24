import {Column} from 'react-table'
import {CopyTextCell} from '../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../_metronic/partials/table/header/TableHeader';
import {Staff} from "../../core/models";

const staffsColumns: ReadonlyArray<Column<Staff>> = [
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID'/>,
        id: 'id',
        Cell: ({...props}) => (
            <CopyTextCell className='text-dark' value={`${props.data[props.row.index].id}`}/>
        ),
    },

]

export {staffsColumns}
