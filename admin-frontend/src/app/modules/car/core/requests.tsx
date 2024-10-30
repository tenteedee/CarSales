import {QueryResponse} from '../../../utils/model/models'
import axios, {AxiosResponse} from 'axios'
import {ID} from '../../../../_metronic/helpers'
import {Brand, Car, Type} from './models'

const API_URL = process.env.REACT_APP_API_URL
const CAR_URL = `${API_URL}/cars`
const GET_CARS_URL = `${CAR_URL}/query`

export const getCars = async (query: string): Promise<QueryResponse> => {
  return axios.get(`${GET_CARS_URL}?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
}
// export const deleteCar = async (carId: Array<ID>): Promise<QueryResponse> => {
//   const response = await axios.delete(`${CAR_URL}/delete`, {
//     data: {ids: carId},
//   })
//   return response.data
// }

export const deleteCar = async (carId: Array<ID>): Promise<QueryResponse> => {
  return axios
    .delete(`${CAR_URL}/delete`, {
      data: {ids: carId},
    })
    .then((response: AxiosResponse<QueryResponse>) => response.data)
}

export const getCar = async (id: string): Promise<QueryResponse> => {
  return axios
    .get(`${CAR_URL}/detail/${id}`)
    .then((response: AxiosResponse<QueryResponse>) => response.data)
}
export const updateCar = async (id: string, car: Car): Promise<QueryResponse> => {
  return axios
    .patch(`${CAR_URL}/edit/${id}`, car)
    .then((response: AxiosResponse<QueryResponse>) => response.data)
}
export const createCar = async (car: Car): Promise<QueryResponse> => {
  const newCar = {
    model: car.model,
    brand_id: car.brand?.id,
    type_id: car.type?.id,
    price: car.price,
    content: car.content,
    description: car.description,
    stock: car.stock,
  }
  return axios
    .post(`${CAR_URL}/create`, newCar)
    .then((response: AxiosResponse<QueryResponse>) => response.data)
}
export const getBrands = async (): Promise<QueryResponse> => {
  return axios.get(`${CAR_URL}/brand`).then((response: AxiosResponse<QueryResponse>) => {
    return response.data
  })
}
export const getTypes = async (): Promise<QueryResponse> => {
  return axios.get(`${CAR_URL}/type`).then((response: AxiosResponse<QueryResponse>) => {
    return response.data
  })
}
