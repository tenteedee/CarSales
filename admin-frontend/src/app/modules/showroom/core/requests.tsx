import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {ID} from "../../../../_metronic/helpers";
import {Showroom} from "./models";

const API_URL = `${process.env.REACT_APP_API_URL}/showrooms`
export const getShowrooms = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteShowroom = (Ids: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/delete`, {
            data: {ids: Ids}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};
export const getShowroom = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateShowroom = (id: string, staff: Showroom): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/${id}`, staff)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createShowroom = (showroom: Showroom): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/create`, showroom)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
