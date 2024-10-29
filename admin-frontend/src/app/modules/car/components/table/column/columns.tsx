import {Column} from 'react-table'
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell'
<<<<<<< HEAD
import {DateFromTimestampCell} from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell'
=======
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader'
import {Car} from '../../../core/models'
import {CarActionsCell} from '../cell/CarActionsCell'
import {SelectionHeader} from '../../../../../../_metronic/partials/table/header/SelectionHeader'
import {SelectionCell} from '../../../../../../_metronic/partials/table/cell/SelectionCell'
<<<<<<< HEAD
import {Link} from 'react-router-dom'
import React from 'react'

const carsColumns: ReadonlyArray<Column<Car>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <SelectionCell id={car.id} />
    },
  },
  {
    Header: (props) => <TableHeader tableProps={props} title='Model' />,
    id: 'model',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <CopyTextCell className='text-dark' value={`${car.model}`} />
    },
  },
  {
    Header: (props) => <TableHeader tableProps={props} title='Brand' />,
    id: 'brand',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <CopyTextCell className='text-dark' value={`${car.brand?.name}`} />
    },
  },
  {
    Header: (props) => <TableHeader tableProps={props} title='Type' />,
    id: 'type',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <CopyTextCell className='text-dark' value={`${car.type?.name}`} />
    },
  },
  {
    Header: (props) => <TableHeader tableProps={props} title='Price' />,
    id: 'price',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <CopyTextCell className='text-dark' value={`${car.price}`} />
    },
  },
  {
    Header: (props) => <TableHeader tableProps={props} title='Stock' />,
    id: 'stock',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <div className='text-primary font-weight-bold mt-1'>{car.stock}</div>
    },
  },
  // {
  //   Header: (props) => <TableHeader tableProps={props} title='Description' />,
  //   id: 'description',
  //   Cell: ({...props}) => {
  //     const car = props.data[props.row.index] as Car
  //     return <div className='text-dark mt-1'>{car.description ?? 'N/A'}</div>
  //   },
  // },
  // {
  //   Header: (props) => <TableHeader tableProps={props} title='Created At' />,
  //   id: 'created_at',
  //   Cell: ({...props}) => {
  //     const car = props.data[props.row.index] as Car
  //     return <DateFromTimestampCell value={car.created_at} />
  //   },
  // },
  {
    Header: (props) => <TableHeader tableProps={props} title='Actions' />,
    id: 'actions',
    Cell: ({...props}) => {
      const car = props.data[props.row.index] as Car
      return <CarActionsCell id={car.id} />
    },
  },
]

export {carsColumns}
=======
import React from 'react'

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
            return <CopyTextCell className='text-dark' value={`${car.price}`}/>
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
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
