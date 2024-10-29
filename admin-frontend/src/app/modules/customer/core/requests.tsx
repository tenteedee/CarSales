import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../_metronic/helpers";
import {Customer} from "./models";

const API_URL = process.env.REACT_APP_API_URL
const _URL = `${API_URL}/customers`
export const getCustomers = (query: string): Promise<QueryResponse> => {
    return axios.get(`${_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const getCustomer = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateCustomer = (id: string, data: Customer): Promise<QueryResponse> => {
    return axios
        .post(`${_URL}/${id}`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createCustomer = (data: Customer): Promise<QueryResponse> => {
    return axios
        .post(`${_URL}/create`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const deleteCustomers = (Ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${_URL}/delete`, {
            data: {ids: Ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};