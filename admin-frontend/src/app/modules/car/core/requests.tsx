import {QueryResponse} from "../../../utils/model/models";
import axios, {AxiosResponse} from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/cars`
export const getCars = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}