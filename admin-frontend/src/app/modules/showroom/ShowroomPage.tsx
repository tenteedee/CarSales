import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {ShowroomCreateWrapper, ShowroomEditWrapper, ShowroomListWrapper} from "./Showroom";

const showroomBreadcrumbs: Array<PageLink> = [
    {
        title: 'Showroom Management',
        path: '/showrooms',
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

const ShowroomPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={showroomBreadcrumbs}>Showrooms list</PageTitle>
                            <ShowroomListWrapper/>
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={showroomBreadcrumbs}>Create Showroom</PageTitle>
                            <ShowroomCreateWrapper/>
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={showroomBreadcrumbs}>Edit Showroom</PageTitle>
                            <ShowroomEditWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default ShowroomPage
