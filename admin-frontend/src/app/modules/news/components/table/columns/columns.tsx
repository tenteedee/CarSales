import {Column} from 'react-table';
import {CopyTextCell} from '../../../../../../_metronic/partials/table/cell/CopyTextCell';
import {DateFromTimestampCell} from '../../../../../../_metronic/partials/table/cell/DateFromTimestampCell';
import {TableHeader} from '../../../../../../_metronic/partials/table/header/TableHeader';
import {SelectionHeader} from "../../../../../../_metronic/partials/table/header/SelectionHeader";
import {SelectionCell} from "../../../../../../_metronic/partials/table/cell/SelectionCell";
import React from "react";
import {News} from '../../../core/models';
import {NewsActionsCell} from '../cell/NewsActionsCell';
import {Link} from "react-router-dom";
import {SwitchStateCell} from "../../../../../../_metronic/partials/table/cell/SwitchStateCell";

const newsColumns: ReadonlyArray<Column<News>> = [
    {
        Header: (props) => <SelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return <SelectionCell id={news.id}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Image'/>,
        id: 'image',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    <div className='d-flex align-items-center'>
                        {/* begin:: Avatar */}
                        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                            <Link className='d-flex flex-column' to={`/news/edit/${news.id}`}>
                                <div className='symbol-label'>
                                    <img src={news.image} alt={news.title} className='w-100' />
                                </div>
                            </Link>

                        </div>
                        <div className='d-flex flex-column'>
                            {/*<div className='d-flex flex-column'>*/}
                            {/*    <CopyTextCell className='text-dark' value={`${staff.email}`}/>*/}
                            {/*</div>*/}
                            {/*<CopyTextCell className='text-dark' value={`${staff.fullname}`}/>*/}
                        </div>
                    </div>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Title'/>,
        id: 'title',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    <Link className='menu-link px-3' to={`/news/edit/${news.id}`}>
                        {news.title}
                    </Link>
                </>
            )
        },
    },
    // {
    //     Header: (props) => <TableHeader tableProps={props} title='Heading'/>,
    //     id: 'heading',
    //     Cell: ({...props}) => {
    //         const news = props.data[props.row.index] as News;
    //         return (
    //             <>
    //                 {news.heading}
    //             </>
    //         )
    //     },
    // },

    {
        Header: (props) => <TableHeader tableProps={props} title='Category'/>,
        id: 'category_id',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    {/*<CopyTextCell className='text-dark' value={`${news.title}`}/>;*/}
                    <Link className='menu-link px-3' to={`/categories/edit/${news.category?.id}`}>
                        {news.category?.name}
                    </Link>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Post By'/>,
        id: 'posted_by',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    <Link className='menu-link px-3' to={`/staffs/edit/${news.posted?.id}`}>
                        {news.posted?.fullname}
                    </Link>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Status'/>,
        id: 'status',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    <SwitchStateCell value={news?.status} table={"news"} column={"status"} id={news.id}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Pin'/>,
        id: 'is_pin',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return (
                <>
                    <SwitchStateCell value={news?.is_pin} table={"news"} column={"is_pin"} id={news.id}/>
                </>
            )
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Created At'/>,
        id: 'created_at',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return <DateFromTimestampCell value={news.created_at}/>;
        },
    },
    {
        Header: (props) => <TableHeader tableProps={props} title='Actions'/>,
        id: 'actions',
        Cell: ({...props}) => {
            const news = props.data[props.row.index] as News;
            return <NewsActionsCell id={news.id}/>;
        },
    },
];
export {newsColumns};
