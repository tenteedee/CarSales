import {ID} from "../../../_metronic/helpers";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {deleteNews, getNews} from "./core/requests";
import {NewsList} from "./components/NewsList";
import {NewsEdit} from "./components/NewsEdit";

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteNews(ids); // Gọi hàm deleteStaff
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
const NewsListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"news"} request={getNews}>
                    <ListViewProvider onDelete={handleDelete}>
                        <NewsList/>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const NewsEditWrapper = () => {
    return (
        <>
            <NewsEdit/>
        </>
    );
}
export {NewsListWrapper, NewsEditWrapper}
