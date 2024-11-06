import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../_metronic/helpers";
import {Order} from "./models";

const API_URL = process.env.REACT_APP_API_URL
export const getOrders = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/orders/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteOrders = (ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/orders/delete`, {
            data: {ids: ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};
export const getOrder = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/orders/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateOrder = (id: string, category: Order): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/orders/${id}`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createOrder = (category: Order): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/orders/create`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}