/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {TableRight} from "./menu/TableRight";
import {useAuth} from "../../modules/auth";
import TopSellingCars from "./menu/TopSellingCars";

const DashboardPage: FC = () => {
    const {hasRole} = useAuth()

    return (<>
        <div className='row g-5 gx-xxl-8'>
            {hasRole("Director") && (
                <div className='col-xxl-4'>
                    <TopSellingCars/>
                </div>
            )}
            <div className={`col-xxl-${hasRole("Director") ? 8 : 12}`}>
                <TableRight className='card-xxl-stretch mb-5 mb-xxl-8'/>
            </div>
        </div>
    </>);
}


const DashboardWrapper: FC = () => {
    const intl = useIntl()
    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
