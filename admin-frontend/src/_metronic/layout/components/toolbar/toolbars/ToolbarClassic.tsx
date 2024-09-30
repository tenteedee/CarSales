/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {KTIcon} from '../../../../helpers'
import {useLayout} from '../../../core'
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../../../../../app/modules/auth";

const ToolbarClassic = () => {
    const {config} = useLayout()
    const daterangepickerButtonClass = config.app?.toolbar?.fixed?.desktop
        ? 'btn-light'
        : 'bg-body btn-color-gray-700 btn-active-color-primary'
    const location = useLocation();
    const {hasRole} = useAuth()

    return (
        <div className='d-flex align-items-center gap-2 gap-lg-3'>

            {config.app?.toolbar?.daterangepickerButton && (
                <div
                    data-kt-daterangepicker='true'
                    data-kt-daterangepicker-opens='left'
                    className={clsx(
                        'btn btn-sm fw-bold  d-flex align-items-center px-4',
                        daterangepickerButtonClass
                    )}
                >
                    <div className='text-gray-600 fw-bold'>Loading date range...</div>
                    <KTIcon iconName='calendar-8' className='fs-1 ms-2 me-0'/>
                </div>
            )}
            {hasRole("Director") && !location.pathname.endsWith('/create') && (
                <Link
                    to={`${location.pathname}/create`}
                    className='btn btn-sm fw-bold btn-primary'
                >
                    Create
                </Link>
            )}

        </div>
    )
}

export {ToolbarClassic}
