// @ts-nocheck
import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

type Props<T extends object> = {
    row: Row<T>
}

const TableRow: FC<Props> = ({row}) => (
    <tr {...row.getRowProps()}>
        {row.cells.map((cell) => {
            return (
                <td
                    {...cell.getCellProps()}
                    //className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
                    className={""}
                >
                    {cell.render('Cell')}
                </td>
            )
        })}
    </tr>
)

export {TableRow}
