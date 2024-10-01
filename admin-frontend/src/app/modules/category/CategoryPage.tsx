import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {CategoryCreateWrapper, CategoryEditWrapper, CategoryListWrapper} from "./Category";

const categoryBreadcrumbs: Array<PageLink> = [
    {
        title: 'Categories',
        path: '/categories',
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

const CategoryPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={categoryBreadcrumbs}>Categories List</PageTitle>
                            <CategoryListWrapper/>
                        </>
                    }
                />
                <Route
                    path="create"
                    element={
                        <>
                            <PageTitle breadcrumbs={categoryBreadcrumbs}>Create Category</PageTitle>
                            <CategoryCreateWrapper/>
                        </>
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <>
                            <PageTitle breadcrumbs={categoryBreadcrumbs}>Edit Category</PageTitle>
                            <CategoryEditWrapper/>
                        </>
                    }
                />
                <Route path='*' element={<Navigate to='/error/404'/>}/>

            </Route>
        </Routes>
    )
}

export default CategoryPage

