import React, { FC, useEffect, useState } from "react";
import { QueryResponse } from "../../../utils/model/models";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getInsuranceProviders, createInsurance } from "../core/requests";
import { Insurance, InsuranceProvider } from "../core/models";
import { News } from "../../news/core/models";

type Props = {};

export const InsuranceCreate: FC<Props> = ({ ...props }) => {
    const navigate = useNavigate();
    const [insurance, setInsurance] = useState<Partial<Insurance>>({
        type: 0,
        name: '',
        description: '',
        insurance_provider_id: 0,
        type_price: 0,
        price: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [providers, setProviders] = useState<InsuranceProvider[]>([]);

    useEffect(() => {
        getInsuranceProviders('')
            .then((response: QueryResponse) => {
                setProviders(response.data || []);
            })
            .catch((error) => {
                const errorMessage =
                    error && error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : 'Có lỗi xảy ra khi lấy dữ liệu';
                toast.error(errorMessage, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .finally(() => setLoading(false));
    }, []);

    const handleInputChange = (key: string, value: any) => {
        setInsurance((prev) => ({ ...prev, [key]: value }));
    };

    const handleCreate = () => {
        createInsurance(insurance)
            .then(() => {
                toast.success('Tạo mới thành công!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/insurances/base', { state: { reload: true } });
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'Có lỗi xảy ra khi tạo mới';
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
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Tạo mới bảo hiểm</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Type</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={insurance.type}
                                onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setInsurance({ ...insurance, type: selected });
                                }}                             >
                                <option value=''>Select Type</option>
                                <option value={'1'}>Bắt buộc</option>
                                <option value={'2'}>Thân vỏ</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Name</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name="name"
                                className='form-control'
                                value={insurance.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Description</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name="description"
                                className='form-control'
                                value={insurance.description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Provider</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={insurance.insurance_provider_id}
                                onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setInsurance({ ...insurance, insurance_provider_id: selected });
                                }}                            >
                                <option value=''>Select Provider</option>
                                {providers.map((provider) => (
                                    <option key={provider.id} value={provider.id || ''}>
                                        {provider.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Loại tính giá</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={insurance.type_price}
                                onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setInsurance({ ...insurance, type_price: selected });
                                }}                             >
                                <option value=''>Select</option>
                                <option value={'1'}>Cố định</option>
                                <option value={'2'}>% giá xe</option>
                            </select>
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Price</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name="price"
                                className='form-control'
                                value={insurance.price}
                                onChange={(e) => handleInputChange("price", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleCreate}>Tạo mới</button>
                    </div>
                </div>
            </div>
        </>
    );
};