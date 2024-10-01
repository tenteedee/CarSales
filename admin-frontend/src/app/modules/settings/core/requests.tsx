import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {Settings} from "./models";

const API_URL = process.env.REACT_APP_API_URL
export const getSettings = (): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/settings`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateSettings = (settings: Settings[]): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/settings`, settings)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}