import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTestDrive } from "../core/requests"; // Thay đổi hàm này để tạo mới
import { TestDrive } from "../core/models";
import { Car } from "../../car/core/models";
import { getCars } from "../../car/core/requests";
import { Staff } from "../../staffs/core/models";
import { getStaffs } from "../../staffs/core/requests";
import {useAuth, UserModel} from "../../auth";
import moment, { Moment } from "moment/moment";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import {getCustomers} from "../../customer/core/requests";

type Props = {};

export const TestDriveCreate: FC<Props> = ({ ...props }) => {
    const navigate = useNavigate();
    const [testDrive, setTestDrive] = useState<TestDrive | null>({
        car_id: undefined,
        sales_staff_id: undefined,
        test_drive_date: "",
        status: "",
        showroom_id: undefined
    });
    const [cars, setCars] = useState<Car[]>([]);
    const [sales, setSales] = useState<Staff[]>([]);
    const [customers, setCustomers] = useState<UserModel[]>([]);

    const getData = () => {
        getCars("")
            .then((response) => {
                setCars(response.data || []);
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.error || 'Có lỗi xảy ra khi lấy dữ liệu xe';
                toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
            });
        getCustomers("")
            .then((response) => {
                setCustomers(response.data || []);
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.error || 'Có lỗi xảy ra khi lấy dữ liệu khách hàng';
                toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
            });
        getStaffs("search=role_id=2")
            .then((response) => {
                setSales(response.data || []);
            })
            .catch((error) => {
                const errorMessage = error?.response?.data?.error || 'Có lỗi xảy ra khi lấy dữ liệu nhân viên';
                toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const handleInputChange = (key: string, value: any) => {
        setTestDrive((prevTestDrive) => ({
            ...prevTestDrive,
            [key]: value,
        }));
    };

    const handleDateChange = (date: Moment | string) => {
        if (moment.isMoment(date)) {
            const formattedDate = date.format('YYYY-MM-DD HH:mm:ss');
            handleInputChange('test_drive_date', formattedDate);
        }
    };

    const handleCreate = () => {
        if (testDrive) {
            createTestDrive(testDrive)
                .then(() => {
                    toast.success('Tạo mới thành công!', { position: "top-right", autoClose: 3000 });
                    navigate('/test-drive', { state: { reload: true } });
                })
                .catch((error) => {
                    const errorMessage = error?.response?.data?.error || 'Có lỗi xảy ra khi tạo mới';
                    toast.error(errorMessage, { position: "top-right", autoClose: 3000 });
                });
        }
    };

    const { hasRole } = useAuth();

    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header cursor-pointer'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Tạo yêu cầu lái thử mới</h3>
                </div>
            </div>
            <div className='card-body p-9'>

                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Customer</label>
                    <div className='col-lg-8'>
                        <select
                            className='form-control'
                            value={testDrive?.customer_id || ''}
                            onChange={(e) => handleInputChange('customer_id', Number(e.target.value))}
                        >
                            <option value=''>Select Customer</option>
                            {customers.map((customer) => (
                                <option key={customer.id} value={customer.id || ""}>
                                    {customer.fullname} - {customer.email}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Car</label>
                    <div className='col-lg-8'>
                        <select
                            className='form-control'
                            value={testDrive?.car_id || ''}
                            onChange={(e) => handleInputChange('car_id', Number(e.target.value))}
                        >
                            <option value=''>Select Car</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id || ""}>
                                    {car.model}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {hasRole("Director") && (
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Sale</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={testDrive?.sales_staff_id || ''}
                                onChange={(e) => handleInputChange('sales_staff_id', Number(e.target.value))}
                            >
                                <option value=''>Select Sale</option>
                                {sales
                                    .filter((sale) => sale.role_id == 2 )
                                    .map((sale) => (
                                        <option key={sale.id} value={sale.id || ""}>
                                            {sale.fullname} - {sale.email}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                )}
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Date Test</label>
                    <div className='col-lg-8'>
                        <Datetime
                            value={testDrive?.test_drive_date ? moment(testDrive.test_drive_date) : ''}
                            dateFormat="YYYY-MM-DD"
                            timeFormat="HH:mm:ss"
                            onChange={handleDateChange}
                        />
                    </div>
                </div>
                <div className='row mb-7'>
                    <label className='col-lg-4 fw-bold text-muted'>Status</label>
                    <div className='col-lg-8'>
                        <select
                            className='form-control'
                            value={testDrive?.status || ''}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                        >
                            <option value=''>Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex my-4'>
                    <button className='btn btn-primary' onClick={handleCreate}>Tạo mới</button>
                </div>
            </div>
        </div>
    );
};
