import {Brand, Car, Type} from '../core/models'
import React, {FC, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {getBrands, getCar, getTypes, updateCar} from '../core/requests'
import {QueryResponse} from '../../../utils/model/models'
import {toast} from 'react-toastify'
import {CKEditorForm} from "../../../../_metronic/partials/form/ckfinder/CKEditorForm";
import {numberFormat} from "../../../utils/helpers/helpers";

type Props = {}
export const CarEdit: FC<Props> = ({...props}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState<Car | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [brands, setBrands] = useState<Brand[]>([])
    const [types, setTypes] = useState<Type[]>([])

    const getCarData = () => {
        if (id) {
            getCar(id)
                .then((response: QueryResponse) => {
                    const carData = response.data
                    if (carData && !Array.isArray(carData)) {
                        setCar(carData)
                    } else {
                        setError(true)
                        toast.error('Không tìm thấy dữ liệu xe hoặc dữ liệu không hợp lệ', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                })
                .catch((error) => {
                    setError(true)
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Có lỗi xảy ra khi lấy dữ liệu'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
                .finally(() => setLoading(false))
        }
    }


    useEffect(() => {
        if (id) {
            getCarData()
        }
    }, [id, navigate])

    useEffect(() => {
        getBrands().then((response) => {
            setBrands(response.data || [])
        })
        getTypes().then((response) => {
            setTypes(response.data || [])
        })
    }, [])

    const handleUpdate = () => {
        if (car && id) {
            const formData = new FormData();
            formData.append("model", car.model || "");
            formData.append("brand_id", car.brand_id?.toString() || "");
            formData.append("type_id", car.type_id?.toString() || "");
            formData.append("price", car.price?.toString() || "");
            formData.append("description", car.description || "");
            formData.append("stock", car.stock?.toString() || "");
            formData.append("content", car.content || "");
            formData.append("images", JSON.stringify(car.images));
            car.images?.forEach((image, index) => {
                if (image.upload) {
                    formData.append(`images[${index}][file]`, image.upload);
                }
            });
            updateCar(id, formData)
                .then((response) => {
                    const carData = response.data
                    if (carData && !Array.isArray(carData)) {

                        toast.success('Cập nhật thông tin thành công', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        navigate('/cars', {state: {reload: true}});

                    } else {
                        setError(true)
                        toast.error('Không tìm thấy dữ liệu xe hoặc dữ liệu không hợp lệ', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                    }
                })
                .catch((error) => {
                    const errorMessage =
                        error && error.response && error.response.data && error.response.data.error
                            ? error.response.data.error
                            : 'Cập nhật thất bại, vui lòng thử lại!'
                    toast.error(errorMessage, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
        }
    }
    const handleImageAdd = () => {
        setCar({...car, images: [...(car?.images || []), {image_url: ''}]});
    };

    const handleImageChange = (index: number, url: string) => {
        if (car?.images) {
            const updatedImages = car.images.map((img, i) =>
                i === index ? {image_url: url} : img
            );
            setCar({...car, images: updatedImages});
        }
    };

    const handleImageUpload = (index: number, file: File) => {
        if (car?.images) {
            const updatedImages = [...car.images];
            updatedImages[index] = {
                ...updatedImages[index],
                image_url: file.name,
                upload: file
            };
            setCar({ ...car, images: updatedImages });
        }
    };


    const handleImageRemove = (index: number) => {
        if (car?.images) {
            const updatedImages = car.images.filter((_, i) => i !== index);
            setCar({...car, images: updatedImages});
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return (
            <>
                <div className='fw-semibold fs-6 text-gray-500 mb-7'>
                    Something went wrong! Please try again later.
                </div>
            </>
        )
    }

    return (
        <>

            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Car Details</h3>
                    </div>
                </div>

                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Model</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                className='form-control'
                                value={car?.model || ''}
                                onChange={(e) => setCar({...car, model: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Description</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                className='form-control'
                                value={car?.description  || ''}
                                onChange={(e) => setCar({...car, description : e.target.value})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Brand</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={car?.brand_id || ''}
                                onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setCar({...car, brand_id: selected});
                                }}
                            >
                                <option value=''>Select Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id || ""}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Type</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={car?.type_id || ''}
                                onChange={(e) => {
                                    const selected = Number(e.target.value);
                                    setCar({...car, type_id: selected});
                                }}
                            >
                                <option value=''>Select Type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id || ""}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Price</label>
                        <div className='col-lg-8 d-flex align-items-center'>
                            <input
                                type='text'
                                className='form-control'
                                value={numberFormat(car?.price) || ''}
                                onChange={(e) => setCar({...car, price: parseFloat(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Stock</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                className='form-control'
                                value={car?.stock || ''}
                                onChange={(e) => setCar({...car, stock: parseFloat(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Content</label>
                        <div className='col-lg-8'>
                            <CKEditorForm
                                data={{content: car?.content ?? ""}}
                                setData={(updatedData) => setCar({...car, content: updatedData.content})}
                                fieldName="content"
                            />
                        </div>
                    </div>
                    <hr/>
                    {/* Image Upload Section */}
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Images</label>
                        <div className='col-lg-8'>
                            {car?.images?.map((image, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <input
                                        type="text"
                                        className="form-control me-2"
                                        value={typeof image.image_url === "string" ? image.image_url : ""}
                                        disabled={!!image.upload}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                    />
                                    <label
                                        className="btn btn-secondary btn-sm"
                                        style={{padding: "5px 10px"}}
                                        onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                                    >
                                        Chọn hình ảnh
                                    </label>
                                    <label
                                        className="btn btn-danger btn-sm ms-2"
                                        style={{padding: "5px 10px"}}
                                        onClick={() => handleImageRemove(index)}
                                    >
                                        Xoá ảnh
                                    </label>
                                    <input
                                        type="file"
                                        id={`file-input-${index}`}
                                        style={{display: "none"}}
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files[0]) {
                                                handleImageUpload(index, e.target.files[0]);
                                                e.target.value = "";
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                            <button className='btn btn-primary btn-sm mt-2' onClick={handleImageAdd}>
                                + Thêm hình ảnh
                            </button>
                        </div>
                    </div>
                    <div className='d-flex my-4'>
                        <button className='btn btn-primary' onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}