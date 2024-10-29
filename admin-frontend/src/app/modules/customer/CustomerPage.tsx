import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {CustomerCreateWrapper, CustomerEditWrapper, CustomerListWrapper} from "./Customer";

const customersBreadcrumbs: Array<PageLink> = [
    {
        title: 'Customer',
        path: '/customers',
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

const CustomerPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={customersBreadcrumbs}>Customer List</PageTitle>
                            <CustomerListWrapper/>
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={customersBreadcrumbs}>Create Customer</PageTitle>
                            <CustomerCreateWrapper/>
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={customersBreadcrumbs}>Edit Customer</PageTitle>
                            <CustomerEditWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default CustomerPage

