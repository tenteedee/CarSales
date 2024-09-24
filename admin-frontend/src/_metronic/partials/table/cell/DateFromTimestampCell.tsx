/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {timeToDate} from "../../../../app/utils/helpers/helpers";

type Props = {
    value: number
}

const DateFromTimestampCell: FC<Props & any> = ({value, ...props}) => (
    <div className='font-weight-bold mt-1' {...props}>
        {timeToDate(value)}
    </div>
)

export {DateFromTimestampCell}
