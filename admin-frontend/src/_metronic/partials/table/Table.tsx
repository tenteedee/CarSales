import { useMemo } from 'react'
import { useTable, ColumnInstance, Row, Column } from 'react-table'
import { KTCardBody } from '../../helpers';
import {useQueryResponseData, useQueryResponseLoading} from "../../layout/core/QueryResponseProvider";
import { TableHeaderColumn } from './header/TableHeaderColumn';
import { TableLoading } from './loading/TableLoading';
import { TablePagination } from './pagination/TablePagination';
import { TableRow } from './row/TableRow';

type Props<T extends object> = {
    columns: ReadonlyArray<Column<T>>
    id?: string
}

function Table<T extends object>({ columns, id }: Props<T>) {
    const responseData = useQueryResponseData<T>()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => responseData, [responseData])
    const tableColumns = useMemo(() => columns, [columns])
    const { getTableProps, getTableBodyProps, headers, rows, prepareRow, footerGroups } = useTable<T>({
        columns: tableColumns,
        data,
    })

    return (
        <KTCardBody className='py-4'>
            <div className='table-responsive'>
                <table
                    id={`#${id ?? 'kt_table'}`}
                    className='table align-middle table-row-dashed fs-7 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<T>) => (
                            <TableHeaderColumn key={column.id} column={column} />
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<T>, i) => {
                            prepareRow(row)
                            return <TableRow row={row} key={`row-${i}-${row.id}`} />
                        })
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                    {isLoading ? <>Đang tải...</> : <>Không có bản ghi nào</>}
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                    <tfoot>
                    {footerGroups.map(group => (
                        <tr {...group.getFooterGroupProps()}>
                            {group.headers.map(column => (
                                <td {...column.getFooterProps()}>
                                    {column.Footer
                                        ? column.render('Footer')
                                        : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tfoot>
                </table>
            </div>
            <TablePagination />
            {isLoading && <TableLoading />}
        </KTCardBody>
    )
}

export { Table }
