
import axios, { AxiosResponse } from 'axios';
import { QueryResponse } from '../../../utils/model/models';
import { Profile } from './models';


const API_URL = process.env.REACT_APP_API_URL;
const PROFILE_URL = `${API_URL}/profile`;

// Fetch profile of the logged-in user
export const getProfile = (): Promise<QueryResponse> => {
  return axios
    .get(PROFILE_URL)
    .then((response: AxiosResponse<QueryResponse>) => response.data)
    .catch((error) => {
      console.error('Error fetching profile:', error);
      throw error;
    });
};

// Optional: Update profile API (if needed for future functionality)
export const updateProfile = (profileData: any): Promise<QueryResponse> => {
  return axios
    .post(`${PROFILE_URL}/update`, profileData)
    .then((response: AxiosResponse<QueryResponse>) => response.data);
};
