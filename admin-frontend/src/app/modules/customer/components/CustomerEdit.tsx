import React, {FC, useEffect, useState} from "react";
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom'
import {QueryResponse} from "../../../utils/model/models";
import {toast} from "react-toastify";
import {KTIcon} from "../../../../_metronic/helpers";
import {getCustomer, updateCustomer} from "../core/requests";
import {Customer} from "../core/models";
import Datetime from "react-datetime";
import moment, {Moment} from "moment";

type Props = {};
export const CustomerEdit: FC<Props> = ({...props}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const getStaffData = () => {
        if (id) {
            getCustomer(id)
                .then((response: QueryResponse) => {
                    const staffData = response.data;
                    if (staffData && !Array.isArray(staffData)) {
                        setCustomer(staffData);
                    } else {
                        setError(true);
                        toast.error('Không tìm thấy dữ liệu khách hàng hoặc dữ liệu không hợp lệ', {
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
                    setError(true);
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
        }

    }
    useEffect(() => {
        if (id) {
            getStaffData();
        }

    }, [id, navigate]);
    const handleRefreshClick = () => {
        if (id) {
            getStaffData();
        }
    }
    const handleUpdate = () => {
        if (customer && id) {
            updateCustomer(id, customer)
                .then((response) => {
                    const staffData = response.data;
                    if (staffData && !Array.isArray(staffData)) {
                        setCustomer(staffData);
                        setCustomer({...customer, password: ""})
                        toast.success('Cập nhật thông tin thành công', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        setError(true);
                        toast.error('Không tìm thấy dữ liệu nhân viên hoặc dữ liệu không hợp lệ', {
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
                        : "Cập nhật thất bại, vui lòng thử lại!";
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
        }
    };
    const handleInputChange = (key: string, value: string) => {
        setCustomer((prev) => {
            if (!prev) return null;
            return {...prev, [key]: value};
        });
    };
    const handleDateChange = (date: Moment | string) => {
        if (moment.isMoment(date)) {
            const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
            handleInputChange('date_of_birth', formattedDate);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <>
                <div className='fw-semibold fs-6 text-gray-500 mb-7'>
                    Something went wrong! Please try again later.
                </div>
            </>
        );
    }

    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                        <div className='flex-grow-1'>
                            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                                            {customer?.fullname}
                                        </a>
                                        <a href='#'>
                                            <KTIcon iconName='verify' className='fs-1 text-primary'/>
                                        </a>
                                    </div>

                                    <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>

                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                                        >
                                            <KTIcon iconName='sms' className='fs-4 me-1'/>
                                            {customer?.email}
                                        </a>
                                    </div>
                                </div>

                                <div className='d-flex my-4'>

                                    <button
                                        className='btn btn-sm btn-primary me-3'
                                        data-bs-toggle='modal'
                                        data-bs-target='#kt_modal_offer_a_deal'
                                        onClick={handleRefreshClick}
                                    >
                                        Refresh
                                    </button>

                                </div>
                            </div>

                            <div className='d-flex flex-wrap flex-stack'>
                                <div className='d-flex flex-column flex-grow-1 pe-8'>
                                    <div className='d-flex flex-wrap'>

                                    </div>
                                </div>
                                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex overflow-auto h-55px'>
                        <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                            <li className='nav-item'>
                                <Link
                                    className={
                                        `nav-link text-active-primary me-6 active`
                                    }
                                    to='#'
                                >
                                    Overview
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <Outlet/>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Profile Details</h3>
                    </div>
                </div>

                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Full Name</label>

                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={customer?.fullname || ''}
                                onChange={(e) => setCustomer({...customer, fullname: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>

                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={customer?.phone_number || ''}
                                onChange={(e) => setCustomer({...customer, phone_number: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Email
                        </label>
                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='email'
                                className='form-control'
                                value={customer?.email || ''}
                                onChange={(e) => setCustomer({...customer, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Address
                        </label>
                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='text'
                                className='form-control'
                                value={customer?.address || ''}
                                onChange={(e) => setCustomer({...customer, address: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Date Of Birth</label>
                        <div className='col-lg-8'>
                            <Datetime
                                value={customer?.date_of_birth ? moment(customer.date_of_birth) : ''}
                                dateFormat="YYYY-MM-DD"
                                timeFormat="HH:mm:ss"
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Password
                            <i
                                className='fas fa-exclamation-circle ms-1 fs-7'
                                data-bs-toggle='tooltip'
                                title='Leave empty to not change password'
                            ></i>
                        </label>

                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='password'
                                className='form-control'
                                placeholder="Nhập mật khẩu mới"
                                value={customer?.password || ''}
                                onChange={(e) => setCustomer({...customer, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}