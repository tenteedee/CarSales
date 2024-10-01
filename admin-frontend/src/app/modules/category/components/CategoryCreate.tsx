import {ChangeEvent, FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Staff} from "../../staffs/core/models";
import {Category} from "../core/models";
import {createStaff} from "../../staffs/core/requests";
import {toast} from "react-toastify";
import {createCategory} from "../core/requests";

type Props = {};

export const CategoryCreate: FC<Props> = ({...props}) => {
    const navigate = useNavigate();
    const [category, setCategory] = useState<Partial<Category>>({
        name: "",
        description: "",
    });
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
    };
    const handleCreate = () => {
        createCategory(category)
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
                navigate('/categories'); // Điều hướng đến /staffs sau khi tạo thành công
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
                        <h3 className='fw-bolder m-0'>Tạo danh mục</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Tên danh mục</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='name'
                                className='form-control'
                                value={category.name || ""}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Mô tả</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='description'
                                className='form-control'
                                value={category.description || ""}
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