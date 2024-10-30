import {Column} from 'react-table'
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell'
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader'
import {Car} from '../../../core/models'
import {CarActionsCell} from '../cell/CarActionsCell'
import {SelectionHeader} from '../../../../../../_metronic/partials/table/header/SelectionHeader'
import {SelectionCell} from '../../../../../../_metronic/partials/table/cell/SelectionCell'
import React from 'react'
import {numberFormat} from "../../../../../utils/helpers/helpers";

const carsColumns: ReadonlyArray<Column<Car>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <SelectionCell id={car.id}/>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Model'/>,
        id: 'model',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <CopyTextCell className='text-dark' value={`${car.model}`}/>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Brand'/>,
        id: 'brand',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <CopyTextCell className='text-dark' value={`${car.brand?.name}`}/>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Type'/>,
        id: 'type',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <CopyTextCell className='text-dark' value={`${car.type?.name}`}/>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Price'/>,
        id: 'price',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <CopyTextCell className='text-dark' value={`${numberFormat(car.price)}`}/>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Stock'/>,
        id: 'stock',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <div className='text-primary font-weight-bold mt-1'>{car.stock}</div>
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const car = props.data[props.row.index] as Car
            return <CarActionsCell id={car.id}/>
        },
    },
]

export {carsColumns}