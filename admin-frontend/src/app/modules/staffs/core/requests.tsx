import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";

const API_URL = process.env.REACT_APP_API_URL
const GET_STAFFS_URL = `${API_URL}/staffs/query`
export const getStaffs = (query: string): Promise<QueryResponse> => {
    return axios.get(`${GET_STAFFS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}