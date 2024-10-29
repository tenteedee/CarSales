import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {ID} from "../../../../_metronic/helpers";
import {News} from "./models";

const API_URL = process.env.REACT_APP_API_URL
const NEWS_URL = `${API_URL}/news`
export const getNews = (query: string): Promise<QueryResponse> => {
    return axios.get(`${NEWS_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteNews = (newsIds: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${NEWS_URL}/delete`, {
            data: {ids: newsIds}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};

export const getNewsID = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${NEWS_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateNews = (id: string, news: News): Promise<QueryResponse> => {
    return axios
        .post(`${NEWS_URL}/${id}`, news)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createNews = (news: News): Promise<QueryResponse> => {
    return axios
        .post(`${NEWS_URL}/create`, news)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}