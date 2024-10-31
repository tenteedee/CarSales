import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import {InsuranceProviderActionsCell} from "../cell/InsuranceProviderActionsCell";
import { Insurance } from '../../../core/models';

const insuranceProviderColumns: ReadonlyArray<Column<Insurance>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <SelectionCell id={insurance.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='#ID'/>,
        id: 'id',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.id}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Name'/>,
        id: 'name',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.name}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Phone'/>,
        id: 'phone_number',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.phone_number}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Email'/>,
        id: 'email',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <CopyTextCell className='text-dark' value={`${insurance.email}`}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const insurance = props.data[props.row.index] as Insurance;
            return <InsuranceProviderActionsCell id={insurance.id}/>;
        },
    },
];

export {insuranceProviderColumns};
