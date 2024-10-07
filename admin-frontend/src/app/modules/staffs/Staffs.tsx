import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {deleteStaff, getStaffs} from "./core/requests";
import {ID} from "../../../_metronic/helpers";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {StaffsList} from "./components/StaffList";
import {StaffEdit} from "./components/StaffEdit";
import {StaffCreate} from "./components/StaffCreate";

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteStaff(ids); // Gọi hàm deleteStaff
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
    } catch (error : any) {
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
const StaffsListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"staffs"} request={getStaffs}>
                    <ListViewProvider onDelete={handleDelete}>
                        <StaffsList/>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const StaffEditWrapper = () => {
    return (
        <>
            <StaffEdit/>
        </>
    );
}
const StaffCreateWrapper = () => {
    return (
        <>
            <StaffCreate></StaffCreate>
        </>
    );
}
export {StaffsListWrapper, StaffEditWrapper, StaffCreateWrapper}
