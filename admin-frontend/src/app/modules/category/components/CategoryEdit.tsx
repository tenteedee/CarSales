import React, { FC, useEffect, useState } from "react";
import { QueryResponse } from "../../../utils/model/models";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getCategory, updateCategory } from "../core/requests";
import {Category} from "../core/models"; // Import updateCategory function

type Props = {};

export const CategoryEdit: FC<Props> = ({ ...props }) => {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate();
    const [category, setCategory] = useState<Category | null>(null); // Initialize category state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Fetch category data
    useEffect(() => {
        if (id) {
            getCategory(id)
                .then((response: QueryResponse) => {
                    const categoryData = response.data;
                    if (categoryData && !Array.isArray(categoryData)) {
                        setCategory(categoryData); // Set the fetched data into the state
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

    // Handle input change and update the state
    const handleInputChange = (key: string, value: string) => {
        setCategory((prevCategory) => {
            if (!prevCategory) return null;
            return { ...prevCategory, [key]: value };
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
                    navigate("/categories"); // Redirect to the category list page after success
                })
                .catch(() => {
                    toast.error('Có lỗi xảy ra khi cập nhật', {
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

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error state
    if (error) {
        return <div>Không thể tải dữ liệu</div>;
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
