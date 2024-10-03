import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {Category} from "../../../core/models";
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import {DateFromTimestampCell} from "../../../../../../_metronic/partials/table/cell/DateFromTimestampCell";
import {CategoryActionsCell} from "../cell/CategoryActionsCell";

const categoryColumns: ReadonlyArray<Column<Category>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return <SelectionCell id={category.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID'/>,
        id: 'id',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return <CopyTextCell className='text-dark' value={`${category.id}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Name'/>,
        id: 'name',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return <CopyTextCell className='text-dark' value={`${category.name}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Description'/>,
        id: 'description',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return <CopyTextCell className='text-dark' value={`${category.description}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Time'/>,
        id: 'created_at',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return (
                <>
                    <DateFromTimestampCell value={category.created_at}/>
                    <DateFromTimestampCell value={category.updated_at}/>
                </>
            );
        },
    },

    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const category = props.data[props.row.index] as Category;
            return <CategoryActionsCell id={category.id}/>;
        },
    },
];

export {categoryColumns};
