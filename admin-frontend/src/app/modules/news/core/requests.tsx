import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {ID} from "../../../../_metronic/helpers";

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
