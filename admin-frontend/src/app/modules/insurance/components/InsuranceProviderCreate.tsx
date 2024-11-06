import {ChangeEvent, FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {InsuranceProvider} from "../core/models";
import {createInsuranceProvider} from "../core/requests";

type Props = {};

export const InsuranceProviderCreate: FC<Props> = ({...props}) => {
    const navigate = useNavigate();
    const [insuranceProvider, setInsuranceProvider] = useState<Partial<InsuranceProvider>>({
        name: "",
        phone_number: "",
        email: "",
    });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInsuranceProvider({
            ...insuranceProvider,
            [e.target.name]: e.target.value
        });
    };
    const handleCreate = () => {
        createInsuranceProvider(insuranceProvider)
            .then(() => {
                toast.success("Tạo danh mục mới thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/insurances/providers', {state: {reload: true}});
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Tạo danh mục mới thất bại, vui lòng thử lại!";
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
    };
    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Tạo nhà cung cấp bảo hiểm</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Name</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='name'
                                className='form-control'
                                value={insuranceProvider.name || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Phone</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='phone_number'
                                className='form-control'
                                value={insuranceProvider.phone_number || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Email</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='email'
                                className='form-control'
                                value={insuranceProvider.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleCreate}>Tạo danh mục</button>
                    </div>
                </div>
            </div>
        </>
    );
}