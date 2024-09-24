import {Route, Routes, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import { StaffsListWrapper } from './Staffs'

const usersBreadcrumbs: Array<PageLink> = [
    {
        title: 'User Management',
        path: '/users',
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
                            <PageTitle breadcrumbs={usersBreadcrumbs}>Staffs list</PageTitle>
                            <StaffsListWrapper />
                        </>
                    }
                />
            </Route>
        </Routes>
    )
}

export default StaffsPage
