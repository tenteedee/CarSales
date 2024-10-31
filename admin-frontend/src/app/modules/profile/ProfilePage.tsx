import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import AccountProfile from "./AccountProfile";
import AccountEdit from "./components/AccountEdit";

const profileBreadcrumbs: Array<PageLink> = [
    {
        title: 'Profile',
        path: '/profile',
        isSeparator: false,
        isActive: false,
    },
];

const ProfilePage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadcrumbs}>Account Profile</PageTitle>
                            <AccountProfile />
                        </>
                    }
                />
                <Route
                    path="edit"
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadcrumbs}>Edit Profile</PageTitle>
                            <AccountEdit />
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404' />} />
            </Route>
        </Routes>
    );
};

export default ProfilePage;