import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../_metronic/helpers";
import {Category} from "./models";
import {Staff} from "../../staffs/core/models";
const API_URL = process.env.REACT_APP_API_URL

export const getCategories = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/categories?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteCategory = (ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/categories/delete`, {
            data: {ids: ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};
export const getCategory = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/categories/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateCategory = (id: string, category: Category): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/categories/${id}`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createCategory = (category: Category): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/categories/create`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}