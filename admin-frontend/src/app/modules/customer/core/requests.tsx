import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";

const API_URL = process.env.REACT_APP_API_URL
const STAFF_URL = `${API_URL}/customers`
export const getCustomers = (query: string): Promise<QueryResponse> => {
    return axios.get(`${STAFF_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}