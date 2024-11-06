import React, {FC, useEffect, useState} from 'react'
import {QueryResponse} from '../../../utils/model/models'
import {toast} from 'react-toastify'
import {Link, Navigate, Outlet, Route, Routes, useLocation, useNavigate, useParams} from 'react-router-dom'
import {Car} from '../../car/core/models'
import {getCars} from '../../car/core/requests'
import {Staff} from '../../staffs/core/models'
import {getStaffs} from '../../staffs/core/requests'
import 'react-datetime/css/react-datetime.css'
import {getOrder, updateOrder} from "../core/requests";
import {Order, OrderDetail} from "../core/models";
import {KTIcon} from "../../../../_metronic/helpers";

type PropsDeltails = {
    order: Order | null
}
export const OrderEditDetails: FC<PropsDeltails> = ({...props}) => {
    const [order, setOrder] = useState<Order | null>(null)
    const navigate = useNavigate()

    const handleUpdate = () => {

    }
    useEffect(() => {
        setOrder(props.order)
    }, [order, navigate])

    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Cập nhật chi tiết đơn hàng</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    {order && order.order_details ? (
                        <>
                            {order.order_details.map((detail: OrderDetail, index: number) => (
                                <div className='row mb-7'>
                                    <label className='col-lg-4 fw-bold text-muted'>{detail.description}</label>
                                    <div className='col-lg-8'>
                                        <input
                                            type='text'
                                            className='form-control form-control-lg form-control-solid'
                                            value={detail?.price || ''}
                                        />
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Không có chi tiết đơn hàng.</p>
                    )}
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

type PropsIndex = {
    order: Order | null
}
export const OrderEditIndex: FC<PropsIndex> = ({...props}) => {
    // const order = props.order;
    const [order, setOrder] = useState<Order | null>(null)
    const [cars, setCars] = useState<Car[]>([])
    const [sales, setSales] = useState<Staff[]>([])
    const navigate = useNavigate()
    const getData = () => {
        if (order) {
            getCars('')
                .then((response: QueryResponse) => {
                    setCars(response.data || [])
                })
                .catch((error) => {
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Có lỗi xảy ra khi lấy dữ liệu'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
            getStaffs('')
                .then((response: QueryResponse) => {
                    setSales(response.data || [])
                })
                .catch((error) => {
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Có lỗi xảy ra khi lấy dữ liệu'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })

        }
    }
    const handleInputChange = (key: string, value: string) => {
        setOrder((prevOrders) => {
            if (!prevOrders) return null
            return {...prevOrders, [key]: value}
        })
    }

    const handleUpdate = () => {
        if (order) {
            updateOrder("" + order?.id ?? "", order)
                .then(() => {
                    toast.success('Cập nhật thành công!', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    navigate('/orders', {state: {reload: true}})
                })
                .catch((error) => {
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Có lỗi xảy ra khi cập nhật'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
        }
    }
    useEffect(() => {
        setOrder(props.order)
        getData()
    }, [order, navigate])

    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Cập nhật đơn hàng</h3>
                    </div>
                </div>
                <div className='card-body p-9'>

                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

type Props = {}

export const OrderEdit: FC<Props> = ({...props}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [order, setOrders] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getData = () => {
        if (id) {
            getOrder(id)
                .then((response: QueryResponse) => {
                    const orderData = response.data
                    if (orderData && !Array.isArray(orderData)) {
                        setOrders(orderData)
                    } else {
                        setError(true)
                        toast.error('Không tìm thấy dữ liệu hoặc dữ liệu không hợp lệ', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                })
                .catch((error) => {
                    setError(true)
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Có lỗi xảy ra khi lấy dữ liệu'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
                .finally(() => setLoading(false))

        }
    }
    useEffect(() => {
        getData()
    }, [id, navigate])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <>
                <div className='fw-semibold fs-6 text-gray-500 mb-7'>
                    Something went wrong! Please try again later.
                </div>
            </>
        )
    }

    return (
        <>
            <OrderEditHeader order={order || null}/>
            <Routes>
                <Route element={<Outlet/>}>
                    <Route
                        index
                        element={
                            <>
                                <OrderEditIndex order={order || null}/>
                            </>
                        }
                    />
                    <Route
                        path="details"
                        element={
                            <>
                                <OrderEditDetails order={order || null}/>
                            </>
                        }
                    />
                </Route>
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Routes>
        </>
    )
}
type PropsHeader = {
    order: Order | null
}
const OrderEditHeader: React.FC<PropsHeader> = ({...props}) => {
    const location = useLocation()
    return (
        <div className='card mb-5 mb-xl-10'>
            <div className='card-body pt-9 pb-0'>
                <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>

                    <div className='flex-grow-1'>
                        <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                            <div className='d-flex flex-column'>
                                <div className='d-flex align-items-center mb-2'>
                                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                                        Max Smith
                                    </a>
                                    <a href='#'>
                                        <KTIcon iconName='verify' className='fs-1 text-primary'/>
                                    </a>
                                </div>

                                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                                    >
                                        <KTIcon iconName='profile-circle' className='fs-4 me-1'/>
                                        Developer
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                                    >
                                        <KTIcon iconName='geolocation' className='fs-4 me-1'/>
                                        SF, Bay Area
                                    </a>
                                    <a
                                        href='#'
                                        className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                                    >
                                        <KTIcon iconName='sms' className='fs-4 me-1'/>
                                        max@kt.com
                                    </a>
                                </div>
                            </div>


                        </div>

                        <div className='d-flex flex-wrap flex-stack'>
                            <div className='d-flex flex-column flex-grow-1 pe-8'>
                                <div className='d-flex flex-wrap'>
                                    <div
                                        className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                                        <div className='d-flex align-items-center'>
                                            <KTIcon iconName='arrow-up' className='fs-3 text-success me-2'/>
                                            <div className='fs-2 fw-bolder'>4500$</div>
                                        </div>

                                        <div className='fw-bold fs-6 text-gray-400'>Earnings</div>
                                    </div>

                                </div>
                            </div>

                            <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>
                                <div className='d-flex justify-content-between w-100 mt-auto mb-2'>
                                    <span className='fw-bold fs-6 text-gray-400'>Profile Compleation</span>
                                    <span className='fw-bolder fs-6'>50%</span>
                                </div>
                                <div className='h-5px mx-3 w-100 bg-light mb-3'>
                                    <div
                                        className='bg-success rounded h-5px'
                                        role='progressbar'
                                        style={{width: '50%'}}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex overflow-auto h-55px'>
                    <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                        <li className='nav-item'>
                            <Link
                                className={
                                    `nav-link text-active-primary me-6 ` +
                                    (location.pathname === `/orders/edit/${props.order?.id}` && 'active')
                                }
                                to={`/orders/edit/${props.order?.id}`}
                            >
                                Overview
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                className={
                                    `nav-link text-active-primary me-6 ` +
                                    (location.pathname === `/orders/edit/${props.order?.id}/details` && 'active')
                                }
                                to={`/orders/edit/${props.order?.id}/details`}
                            >
                                Details
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

