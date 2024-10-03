import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {NewsWrapper} from "./News";

const newsBreadcrumbs: Array<PageLink> = [
    {
        title: 'New',
        path: '/news',
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

const NewsPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={newsBreadcrumbs}>News</PageTitle>
                            <NewsWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default NewsPage

