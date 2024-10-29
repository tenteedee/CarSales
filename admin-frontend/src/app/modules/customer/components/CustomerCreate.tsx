import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCustomer } from "../core/requests";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";

type Props = {};
export const CustomerCreate: FC<Props> = ({ ...props }) => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        fullname: "",
        email: "",
        phone_number: "",
        address: "",
        date_of_birth: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleCreate = () => {
        setLoading(true);
        createCustomer(customer)
            .then((response) => {
                toast.success("Tạo khách hàng thành công", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/customers");
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Tạo khách hàng thất bại, vui lòng thử lại!";
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

    const handleInputChange = (key: string, value: string) => {
        setCustomer((prev) => ({ ...prev, [key]: value }));
    };

    const handleDateChange = (date: Moment | string) => {
        if (moment.isMoment(date)) {
            const formattedDate = date.format("YYYY-MM-DD HH:mm:ss");
            handleInputChange("date_of_birth", formattedDate);
        }
    };

    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Create New Customer</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={customer.fullname}
                                onChange={(e) => handleInputChange("fullname", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>
                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={customer.phone_number}
                                onChange={(e) => handleInputChange("phone_number", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Email</label>
                        <div className='col-lg-8'>
                            <input
                                type="email"
                                className='form-control'
                                value={customer.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Address</label>
                        <div className='col-lg-8'>
                            <input
                                type="text"
                                className='form-control'
                                value={customer.address}
                                onChange={(e) => handleInputChange("address", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Date Of Birth</label>
                        <div className='col-lg-8'>
                            <Datetime
                                value={customer.date_of_birth ? moment(customer.date_of_birth) : ""}
                                dateFormat="YYYY-MM-DD"
                                timeFormat="HH:mm:ss"
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>

                    <div className='d-flex my-4'>
                        <button
                            className='btn btn-primary'
                            onClick={handleCreate}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
