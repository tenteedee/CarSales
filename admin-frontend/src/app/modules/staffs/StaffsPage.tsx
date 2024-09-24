import {Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { StaffsListWrapper } from './Staffs'

const staffsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Staff Management',
        path: '/staffs',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const StaffsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={staffsBreadcrumbs}>Staffs list</PageTitle>
                            <StaffsListWrapper />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default StaffsPage
