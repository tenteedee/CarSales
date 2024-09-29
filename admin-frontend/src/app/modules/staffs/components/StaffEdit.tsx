import {Staff} from "../core/models";
import React, {FC, useEffect, useState} from "react";
import {PageLink} from "../../../../_metronic/layout/core";
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom'
import {getStaff} from "../core/requests";
import {QueryResponse} from "../../../utils/model/models";
import {toast} from "react-toastify";
import {KTIcon, toAbsoluteUrl} from "../../../../_metronic/helpers";
import {ChartsWidget1, ListsWidget5, TablesWidget1, TablesWidget5} from "../../../../_metronic/partials/widgets";


const accountBreadCrumbs: Array<PageLink> = [
    {
        title: 'Account',
        path: '/staffs/edit/:id',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]
type Props = {};
export const StaffEdit: FC<Props> = ({...props}) => {
    const {id} = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();
    const [staff, setStaff] = useState<Staff | null>(null); // Khai báo state staff
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            getStaff(id)
                .then((response: QueryResponse) => {
                    const staffData = response.data;
                    if (staffData && !Array.isArray(staffData)) {
                        setStaff(staffData); // Đặt dữ liệu nhân viên vào state
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
                .catch(() => {
                    setError(true);
                    toast.error('Có lỗi xảy ra khi lấy dữ liệu', {
                        position: "top-right",  // Sử dụng chuỗi trực tiếp
                        autoClose: 3000, // Đóng thông báo sau 3 giây
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .finally(() => setLoading(false));
        }
    }, [id, navigate]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <>

            </>
        );
    }
    return (
        <>
            <div className='card mb-5 mb-xl-10'>
                <div className='card-body pt-9 pb-0'>
                    <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
                        <div className='me-7 mb-4'>
                            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                                <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='Metronic'/>
                                <div
                                    className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
                            </div>
                        </div>

                        <div className='flex-grow-1'>
                            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex align-items-center mb-2'>
                                        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                                            {staff?.fullname}
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
                                            {staff?.role?.name}
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                                        >
                                            <KTIcon iconName='geolocation' className='fs-4 me-1'/>
                                            {staff?.showroom?.name}
                                        </a>
                                        <a
                                            href='#'
                                            className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                                        >
                                            <KTIcon iconName='sms' className='fs-4 me-1'/>
                                            {staff?.email}
                                        </a>
                                    </div>
                                </div>

                                <div className='d-flex my-4'>

                                    <a
                                        href='#'
                                        className='btn btn-sm btn-danger me-3'
                                        data-bs-toggle='modal'
                                        data-bs-target='#kt_modal_offer_a_deal'
                                    >
                                        Delete
                                    </a>

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
                            <span className='fw-bolder fs-6 text-dark'>{staff?.fullname}</span>
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Role</label>

                        <div className='col-lg-8'>
                            <span className='fw-bolder fs-6 text-danger'>{staff?.role?.name}</span>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Showroom</label>

                        <div className='col-lg-8 fv-row'>
                            <span className='fw-bold fs-6'>{staff?.showroom?.name}</span>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>
                            Email
                            <i
                                className='fas fa-exclamation-circle ms-1 fs-7'
                                data-bs-toggle='tooltip'
                                title='Phone number must be active'
                            ></i>
                        </label>

                        <div className='col-lg-8 d-flex align-items-center'>
                            <span className='fw-bolder fs-6 me-2'>{staff?.email}</span>
                            <span className='badge badge-success'>Verified</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row gy-10 gx-xl-10'>
                <div className='col-xl-6'>
                    <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10'/>
                </div>

                <div className='col-xl-6'>
                    <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10'/>
                </div>
            </div>

            <div className='row gy-10 gx-xl-10'>
                <div className='col-xl-6'>
                    <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10'/>
                </div>

                <div className='col-xl-6'>
                    <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10'/>
                </div>
            </div>
        </>
    )
}