import {ID} from "../../../_metronic/helpers";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {CategoryList} from "./components/CategoryList";
import {deleteCategory, getCategories} from "./core/requests";
import {CategoryEdit} from "./components/CategoryEdit";
import {CategoryCreate} from "./components/CategoryCreate";

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteCategory(ids);
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
    } catch (error) {
        toast.error('Có lỗi xảy ra khi xoá', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        throw error; // Ném lỗi để xử lý ở nơi khác nếu cần
    }
};
const CategoryListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"categories"} request={getCategories}>
                    <ListViewProvider onDelete={handleDelete}>
                        <CategoryList></CategoryList>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const CategoryEditWrapper = () => {
    return (
        <>
            <CategoryEdit/>
        </>
    );
}
const CategoryCreateWrapper = () => {
    return (
        <>
            <CategoryCreate/>
        </>
    );
}
export {CategoryListWrapper, CategoryEditWrapper, CategoryCreateWrapper}
