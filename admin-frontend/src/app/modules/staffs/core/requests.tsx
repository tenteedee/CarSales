import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL
const GET_STAFFS_URL = `${API_URL}/staffs/query`
export const getStaffs = (query: string) => {
    return axios.get(`${GET_STAFFS_URL}?${query}`)
}