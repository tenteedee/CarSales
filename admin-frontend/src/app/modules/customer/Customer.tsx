import {ID} from "../../../_metronic/helpers";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {deleteCustomers, getCustomers} from "./core/requests";
import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {getNews} from "../news/core/requests";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {NewsList} from "../news/components/NewsList";
import {CustomerList} from "./components/CustomerList";
import {StaffEdit} from "../staffs/components/StaffEdit";
import {CustomerEdit} from "./components/CustomerEdit";
import {CustomerCreate} from "./components/CustomerCreate";

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteCustomers(ids); // Gọi hàm deleteStaff
        toast.success('Xoá thành công', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return response;
    } catch (error: any) {
        const errorMessage = error && error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Có lỗi xảy ra khi xoá';
        toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        throw error;
    }
};
const CustomerListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"customers"} request={getCustomers}>
                    <ListViewProvider onDelete={handleDelete}>
                        <CustomerList/>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const CustomerEditWrapper = () => {
    return (
        <>
            <CustomerEdit/>
        </>
    );
}
const CustomerCreateWrapper = () => {
    return (
        <>
            <CustomerCreate/>
        </>
    );
}
export {CustomerListWrapper,CustomerEditWrapper,CustomerCreateWrapper}
