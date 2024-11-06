import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";
import {ID} from "../../../../_metronic/helpers";
import {Insurance, InsuranceProvider} from "./models";

const API_URL = process.env.REACT_APP_API_URL


export const getInsurances = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/insurances/base/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteInsurances = (ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/insurances/base/delete`, {
            data: {ids: ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};
export const getInsurance = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/insurances/base/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateInsurance = (id: string, data: Insurance): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/base/${id}`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createInsurance = (data: Insurance): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/base/create`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}


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
export const updateInsuranceProvider = (id: string, data: InsuranceProvider): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/providers/${id}`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createInsuranceProvider = (data: InsuranceProvider): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/insurances/providers/create`, data)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}