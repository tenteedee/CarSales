import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";

const API_URL = process.env.REACT_APP_API_URL
export const getSettings = (): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/settings`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateSettings = (formData: FormData): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/settings`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
