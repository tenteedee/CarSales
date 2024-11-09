import {ID} from "../../../_metronic/helpers";
import {QueryResponse} from "../../utils/model/models";
import {toast} from "react-toastify";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {ListViewProvider} from "../../../_metronic/layout/core/ListViewProvider";
import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {InsuranceProviderList} from "./components/InsuranceProviderList";
import {InsuranceProviderEdit} from "./components/InsuranceProviderEdit";
import {InsuranceProviderCreate} from "./components/InsuranceProviderCreate";
import {deleteInsuranceProviders, deleteInsurances, getInsuranceProviders, getInsurances} from "./core/requests";
import {InsuranceList} from "./components/InsuranceList";
import {InsuranceEdit} from "./components/InsuranceEdit";
import {InsuranceCreate} from "./components/InsuranceCreate";

export const handleDeleteProvider = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteInsuranceProviders(ids);
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

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteInsurances(ids);
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

const InsuranceListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"insurances"} request={getInsurances}>
                    <ListViewProvider onDelete={handleDelete}>
                        <InsuranceList></InsuranceList>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const InsuranceProviderListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"insurances-providers"} request={getInsuranceProviders}>
                    <ListViewProvider onDelete={handleDeleteProvider}>
                        <InsuranceProviderList></InsuranceProviderList>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );
}
const InsuranceEditWrapper = () => {
    return (
        <>
            <InsuranceEdit/>
        </>
    );
}
const InsuranceProviderEditWrapper = () => {
    return (
        <>
            <InsuranceProviderEdit/>
        </>
    );
}
const InsuranceProviderCreateWrapper = () => {
    return (
        <>
            <InsuranceProviderCreate/>
        </>
    );
}
const InsuranceCreateWrapper = () => {
    return (
        <>
            <InsuranceCreate/>
        </>
    );
}
export {
    InsuranceCreateWrapper,
    InsuranceEditWrapper,
    InsuranceListWrapper,
    InsuranceProviderListWrapper,
    InsuranceProviderEditWrapper,
    InsuranceProviderCreateWrapper
}