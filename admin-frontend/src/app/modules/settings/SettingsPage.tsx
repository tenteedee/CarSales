import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {SettingsGeneralWrapper} from "./Settings";

const settingsBreadcrumbs: Array<PageLink> = [
    {
        title: 'Settings',
        path: '/settings',
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

const SettingsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={settingsBreadcrumbs}>Settings</PageTitle>
                            <SettingsGeneralWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default SettingsPage
