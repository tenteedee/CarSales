import {FC, useEffect, useState} from 'react'
import {ID} from "../../../helpers";
import {useAuth} from "../../../../app/modules/auth";
import {updateState} from "../../../../app/utils/requests/requests";

type Props = {
    id: ID
    table: string
    column: string
    value?: boolean
}

const SwitchStateCell: FC<Props> = ({table, column, id, value}) => {

    const [state, setState] = useState(value);
    const {hasRole} = useAuth()

    useEffect(() => {
        setState(value)
    }, [value, id])

    function handleChange(checked: boolean) {
        setState(checked)
        updateState(table, column, id, checked)
            .catch(() => {
                setState(!checked)
            })
    }

    return (
        <div className=''>
            <div className='form-check form-switch form-check-custom form-check-solid'>
                <input
                    className='form-check-input h-20px w-30px'
                    type='checkbox'
                    checked={state}
                    onChange={(e) => handleChange(e.target.checked)}
                    disabled={!hasRole('Director')}
                />
                <label className='form-check-label'></label>
            </div>
        </div>
    )
}

export {SwitchStateCell}
