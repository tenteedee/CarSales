import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {InsuranceCreateWrapper, InsuranceEditWrapper, InsuranceListWrapper} from "./Insurance";

const insuranceBreadcrumbs: Array<PageLink> = [
    {
        title: 'Insurances Provider',
        path: '/insurances/provider',
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

const InsurancePage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route path={"providers"} element={<Outlet/>}>
                    <Route
                        index
                        element={
                            <>
                                <PageTitle breadcrumbs={insuranceBreadcrumbs}>Insurances List</PageTitle>
                                <InsuranceListWrapper/>
                            </>
                        }
                    />
                    <Route
                        path="create"
                        element={
                            <>
                                <PageTitle breadcrumbs={insuranceBreadcrumbs}>Create Insurance</PageTitle>
                                <InsuranceCreateWrapper/>
                            </>
                        }
                    />
                    <Route
                        path="edit/:id"
                        element={
                            <>
                                <PageTitle breadcrumbs={insuranceBreadcrumbs}>Edit Insurance</PageTitle>
                                <InsuranceEditWrapper/>
                            </>
                        }
                    />
                </Route>

                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

export default InsurancePage

