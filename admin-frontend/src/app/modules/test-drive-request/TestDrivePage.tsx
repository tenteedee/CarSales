import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {TestDriveCreateWrapper, TestDriveEditWrapper, TestDriveListWrapper} from "./TestDrive";

const testDriveBreadcrumbs: Array<PageLink> = [
    {
        title: 'Test Drive Management',
        path: '/test-drive',
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

const TestDrivePage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={testDriveBreadcrumbs}>Test Drive list</PageTitle>
                            <TestDriveListWrapper/>
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={testDriveBreadcrumbs}>Create Test Drive</PageTitle>
                            <TestDriveCreateWrapper/>
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={testDriveBreadcrumbs}>Edit Test Drive</PageTitle>
                            <TestDriveEditWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default TestDrivePage
