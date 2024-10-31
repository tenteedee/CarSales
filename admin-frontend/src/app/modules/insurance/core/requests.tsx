import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../_metronic/helpers";
import {Insurance} from "./models";

const API_URL = process.env.REACT_APP_API_URL
export const getInsuranceProviders = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/insurances/providers/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteInsuranceProviders = (ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/insurances/providers/delete`, {
            data: {ids: ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};
export const getInsuranceProvider = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/insurances/providers/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateInsuranceProvider = (id: string, category: Insurance): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/providers/${id}`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createInsuranceProvider = (category: Insurance): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/providers/create`, category)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}