import {ID} from "../../../_metronic/helpers";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {deleteShowroom, getShowrooms} from "./core/requests";
import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {StaffsList} from "../staffs/components/StaffList";
import {ShowroomList} from "./components/ShowroomList";
import {ShowroomEdit} from "./components/ShowroomEdit";
import {ShowroomCreate} from "./components/ShowroomCreate";

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteShowroom(ids); // Gọi hàm deleteStaff
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
const ShowroomListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"showrooms"} request={getShowrooms}>
                    <ListViewProvider onDelete={handleDelete}>
                        <ShowroomList/>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const ShowroomEditWrapper = () => {
    return (
        <>
           <ShowroomEdit/>
        </>
    );
}
const ShowroomCreateWrapper = () => {
    return (
        <>
            <ShowroomCreate/>
        </>
    );
}
export {ShowroomListWrapper,ShowroomEditWrapper,ShowroomCreateWrapper}