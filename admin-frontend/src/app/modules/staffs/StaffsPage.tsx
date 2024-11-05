import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { StaffCreateWrapper, StaffEditWrapper, StaffsListWrapper } from './Staffs'
import ProfilePage from './ProfilePage'
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
            <Route element={<Outlet />}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={staffsBreadcrumbs}>Staffs list</PageTitle>
                            <StaffsListWrapper />
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={staffsBreadcrumbs}>Create Staff</PageTitle>
                            <StaffCreateWrapper />
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={staffsBreadcrumbs}>Edit Staff</PageTitle>
                            <StaffEditWrapper />
                        </>
                    }
                />
                <Route
                    path="profile/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={staffsBreadcrumbs}>Profile</PageTitle>
                            <ProfilePage />
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404' />} />

            </Route>
        </Routes>
    )
}

export default StaffsPage
