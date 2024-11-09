import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {KTIcon, toAbsoluteUrl} from "../../../../_metronic/helpers";
import {QueryResponse} from "../../../utils/model/models";
import {Order} from "../../../modules/order/core/models";
import {toast} from "react-toastify";
import {numberFormat} from "../../../utils/helpers/helpers";

const API_URL = process.env.REACT_APP_API_URL;

const getStatistic = async (query: string): Promise<QueryResponse> => {
    return axios.get(`${API_URL}/home/statistic?${query}`).then((d: AxiosResponse<QueryResponse>) => d.data)
};

type Props = {
    className: string;
};

const TableRight: React.FC<Props> = ({className}) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [activeTab, setActiveTab] = useState('Month');
    const [loading, setLoading] = useState(true);

    const fetchStatistics = async (type: string) => {
        getStatistic(`type=${type.toLowerCase()}`).then((response: QueryResponse) => {
            const data = response.data;
            if (data && Array.isArray(data)) {
                setOrders(data as Order[]);
            } else {
                toast.error('Không tìm thấy dữ liệu hoặc dữ liệu không hợp lệ', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'Có lỗi xảy ra khi lấy dữ liệu';
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => setLoading(false));

    };

    useEffect(() => {
        fetchStatistics(activeTab);
    }, [activeTab]);

    return (
        <div className={`card ${className}`}>
            <div className='card-header border-0 pt-5'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Latest Order</span>
                    {/*<span className='text-muted mt-1 fw-semibold fs-7'>More than 400 new products</span>*/}
                </h3>
                <div className='card-toolbar'>
                    <ul className='nav'>
                        {['Month', 'Week', 'Day'].map((tab) => (
                            <li className='nav-item' key={tab}>
                                <a
                                    className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4 me-1 ${
                                        activeTab === tab ? 'active' : ''
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='card-body py-3'>
                <div className='tab-content'>
                    <div className='tab-pane fade show active'>
                        <div className='table-responsive'>
                            <table className='table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4'>
                                <thead>

                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <div className='symbol symbol-45px me-2'>
                                                <span className='symbol-label'>
                                                      <img
                                                          src={toAbsoluteUrl('/media/svg/brand-logos/kickstarter.svg')}
                                                          className='h-50 align-self-center'
                                                          alt=''
                                                      />
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className='text-dark fw-bold mb-1 fs-6'>
                                                {order.customer?.fullname}({order.customer?.email})
                                            </span>
                                            <span
                                                className='text-muted fw-semibold d-block'>{order.car?.brand?.name} - {order.car?.model}</span>
                                        </td>
                                        <td className='text-danger fw-bold'>
                                            {numberFormat(order.total_price)}
                                        </td>
                                        <td className='text-end'>
                                        <span
                                            className={`badge ${
                                                order.order_status === "pending"
                                                    ? "badge-light-warning"
                                                    : order.order_status === "paying"
                                                        ? "badge-light-info"
                                                        : order.order_status === "complete"
                                                            ? "badge-light-success"
                                                            : order.order_status === "cancelled"
                                                                ? "badge-light-danger"
                                                                : "badge-light-secondary"
                                            }`}
                                        >
                                          {order.order_status === "pending"
                                              ? "Pending"
                                              : order.order_status === "paying"
                                                  ? "Paying"
                                                  : order.order_status === "complete"
                                                      ? "Complete"
                                                      : order.order_status === "cancelled"
                                                          ? "Cancelled"
                                                          : "Unknown"}
                                        </span>
                                        </td>
                                        <td className='text-end'>
                                            <a
                                                href={`orders/edit/${order.id}`}
                                                className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary'
                                            >
                                                <KTIcon iconName='arrow-right' className='fs-2'/>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export {TableRight};