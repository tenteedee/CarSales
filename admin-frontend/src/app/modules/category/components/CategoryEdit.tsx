import React, {FC, useEffect, useState} from "react";
import {QueryResponse} from "../../../utils/model/models";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {getCategory, updateCategory} from "../core/requests";
import {Category} from "../core/models"; // Import updateCategory function

type Props = {};

export const CategoryEdit: FC<Props> = ({...props}) => {
    const {id} = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null); // Initialize category state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            getCategory(id)
                .then((response: QueryResponse) => {
                    const categoryData = response.data;
                    if (categoryData && !Array.isArray(categoryData)) {
                        setCategory(categoryData);
                    } else {
                        setError(true);
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
    }, [id, navigate]);

    const handleInputChange = (key: string, value: string) => {
        setCategory((prevCategory) => {
            if (!prevCategory) return null;
            return {...prevCategory, [key]: value};
        });
    };

    // Handle update button click
    const handleUpdate = () => {
        if (category && id) {
            updateCategory(id, category)
                .then(() => {
                    toast.success('Cập nhật thành công!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/categories', {state: {reload: true}});
                })
                .catch((error) => {
                    const errorMessage = error && error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : 'Có lỗi xảy ra khi cập nhật';
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
                        <h3 className='fw-bolder m-0'>Cập nhật danh mục</h3>
                    </div>
                </div>
                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Tên danh mục</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name="name"
                                className='form-control'
                                value={category?.name || ""}
                                onChange={(e) => handleInputChange("name", e.target.value)} // Update name field
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Mô tả</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name="description"
                                className='form-control'
                                value={category?.description || ""}
                                onChange={(e) => handleInputChange("description", e.target.value)} // Update description field
                            />
                        </div>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>Cập nhật</button>
                    </div>
                </div>
            </div>
        </>
    );
};
