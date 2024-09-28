import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {ID} from "../../../../_metronic/helpers";

const API_URL = process.env.REACT_APP_API_URL
const STAFF_URL = `${API_URL}/staffs`
const GET_STAFFS_URL = `${API_URL}/staffs/query`
export const getStaffs = (query: string): Promise<QueryResponse> => {
    return axios.get(`${GET_STAFFS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteStaff = (staffIds: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${STAFF_URL}/delete`, {
            data: {ids: staffIds} // Chuyển mảng ID trong payload (nếu API yêu cầu)
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};

export const getStaff = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${STAFF_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}