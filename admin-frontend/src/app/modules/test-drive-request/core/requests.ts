import axios, {AxiosResponse} from "axios";
import {QueryResponse} from "../../../utils/model/models";
import {ID} from "../../../../_metronic/helpers";
import {TestDrive} from "./models";

const API_URL = `${process.env.REACT_APP_API_URL}/test-drive`
export const getTestDrives = (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/query?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
export const deleteTestDrive = (staffIds: Array<ID>): Promise<QueryResponse> => {
    return axios
        .delete(`${API_URL}/delete`, {
            data: {ids: staffIds}
        })
        .then((response: AxiosResponse<QueryResponse>) => response.data);
};

export const getTestDrive = (id: string): Promise<QueryResponse> => {
    return axios
        .get(`${API_URL}/${id}`)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const updateTestDrive = (id: string, staff: TestDrive): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/${id}`, staff)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
export const createTestDrive = (staff: TestDrive): Promise<QueryResponse> => {
    return axios
        .post(`${API_URL}/create`, staff)
        .then((response: AxiosResponse<QueryResponse>) => response.data);
}
