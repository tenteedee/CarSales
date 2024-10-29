import {QueryRequestProvider} from '../../../_metronic/layout/core/QueryRequestProvider'
import {deleteCar, getCars} from './core/requests'
import {ID} from '../../../_metronic/helpers'
import {QueryResponseProvider} from '../../../_metronic/layout/core/QueryResponseProvider'
import {ListViewProvider} from '../../../_metronic/layout/core/ListViewProvider'
import {QueryResponse} from '../../utils/model/models'
import {toast} from 'react-toastify'
import {CarList} from './components/CarList'
import {CarEdit} from './components/CarEdit'
import {CarCreate} from './components/CarCreate'
import React from 'react'

export const handleDelete = async (ids: Array<ID>): Promise<QueryResponse> => {
    try {
        const response = await deleteCar(ids)
        toast.success('Xoá thành công', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return response
    } catch (error: any) {
        const errorMessage =
            error && error.response && error.response.data && error.response.data.error
                ? error.response.data.error
                : 'Có lỗi xảy ra khi xoá'
        toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        throw error
    }
}
const CarListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={'cars'} request={getCars}>
                    <ListViewProvider onDelete={handleDelete}>
                        <CarList />
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    )
}
const CarEditWrapper = () => {
    return (
        <>
            <CarEdit />
        </>
    )
}
const CarCreateWrapper = () => {
    return (
        <>
            <CarCreate />
        </>
    )
}
export {CarListWrapper, CarEditWrapper, CarCreateWrapper}