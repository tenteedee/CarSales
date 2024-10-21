import {ChangeEvent, FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {Showroom} from "../core/models";
import {createShowroom} from "../core/requests";

type Props = {};

export const ShowroomCreate: FC<Props> = ({...props}) => {
    const navigate = useNavigate();
    const [showroom, setShowroom] = useState<Partial<Showroom>>({
        name: "",
        address: "",
        phone_number: "",
        email: "",
    });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setShowroom({
            ...showroom,
            [e.target.name]: e.target.value
        });
    };
    const handleCreate = () => {
        createShowroom(showroom)
            .then(() => {
                toast.success("Tạo showroom mới thành công!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/showrooms', {state: {reload: true}});
            })
            .catch((error) => {
                const errorMessage = error && error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : "Tạo mới thất bại, vui lòng thử lại!";
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
                        <h3 className='fw-bolder m-0'>Thêm mới showroom</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Tên showroom</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='name'
                                className='form-control'
                                value={showroom.name || ""}
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
                                value={showroom.phone_number || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Email</label>
                        <div className='col-lg-8'>
                            <input
                                type='email'
                                name='email'
                                className='form-control'
                                value={showroom.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Address</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='address'
                                className='form-control'
                                value={showroom.address || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleCreate}>Thêm mới</button>
                    </div>
                </div>
            </div>
        </>
    );
}