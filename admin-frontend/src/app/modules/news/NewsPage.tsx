import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {NewsCreateWrapper, NewsEditWrapper, NewsListWrapper} from "./News";

const newsBreadcrumbs: Array<PageLink> = [
    {
        title: 'News',
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
                            <PageTitle breadcrumbs={newsBreadcrumbs}>News List</PageTitle>
                            <NewsListWrapper/>
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={newsBreadcrumbs}>Create News</PageTitle>
                            <NewsCreateWrapper/>
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={newsBreadcrumbs}>Edit Category</PageTitle>
                            <NewsEditWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default NewsPage

