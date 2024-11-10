import { PageLink, PageTitle } from "../../../_metronic/layout/core";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { OrderEditWrapper, OrderListWrapper } from "./Order";

const orderBreadcrumbs: Array<PageLink> = [
    {
        title: 'Order',
        path: '/orders',
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

const OrderPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    index
                    element={
                        <>
                            <PageTitle breadcrumbs={orderBreadcrumbs}>Orders List</PageTitle>
                            <OrderListWrapper />
                        </>
                    }
                />
                {/*<Route*/}
                {/*    path="create"*/}
                {/*    element={*/}
                {/*        <>*/}
                {/*            <PageTitle breadcrumbs={orderBreadcrumbs}>Create Order</PageTitle>*/}
                {/*            <OrderCreateWrapper/>*/}
                {/*        </>*/}
                {/*    }*/}
                {/*/>*/}
                <Route
                    path="edit/:id/*"
                    element={
                        <>
                            <PageTitle breadcrumbs={orderBreadcrumbs}>Edit Order</PageTitle>
                            <OrderEditWrapper />
                        </>
                    }
                />
            </Route>

            <Route path='*' element={<Navigate to='/error/404' />} />
        </Routes>
    )
}

export default OrderPage