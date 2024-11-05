import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import {OrderActionsCell} from "../cell/OrderActionsCell";
import {Order} from '../../../core/models';
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
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Order;
            return <OrderActionsCell id={insurance.id}/>;
        },
    },
];

export {orderColumns};
