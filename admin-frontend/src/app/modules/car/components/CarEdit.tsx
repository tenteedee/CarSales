<<<<<<< HEAD
import {Car, Brand, Type} from '../core/models'
=======
import {Brand, Car, Type} from '../core/models'
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
import React, {FC, useEffect, useState} from 'react'
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom'
import {getBrands, getCar, getTypes, updateCar} from '../core/requests'
import {QueryResponse} from '../../../utils/model/models'
import {toast} from 'react-toastify'
import {KTIcon} from '../../../../_metronic/helpers'
<<<<<<< HEAD

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

  const selectBrand = (id: string) => {
    const selectedBrand = brands.find((brand) => brand.id === id)
    return selectedBrand
  }

  const selectType = (id: string) => {
    const selectedType = types.find((type) => type.id === id)
    return selectedType
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

  const handleRefreshClick = () => {
    if (id) {
      getCarData()
    }
  }
  const handleUpdate = () => {
    if (car && id) {
      updateCar(id, car)
        .then((response) => {
          const carData = response.data
          if (carData && !Array.isArray(carData)) {
            setCar(carData)
            setCar({...car})
            toast.success('Cập nhật thông tin thành công', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
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
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            {/* <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-150px symbol-fixed position-relative'>
                <img
                  src={car?.avatar_url || '/media/avatars/default-avatar.jpg'}
                  alt='Avatar'
                  onClick={handleImageClick}
                />
                <input
                  type='file'
                  id='file-input-avatar'
                  style={{display: 'none'}}
                  accept='image/*'
                  onChange={handleImageChange}
                />
                <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
              </div>
            </div> */}

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {car?.model}
                    </a>
                    <a href='#'>
                      <KTIcon iconName='verify' className='fs-1 text-primary' />
                    </a>
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='profile-circle' className='fs-4 me-1' />
                      {car?.brand?.name}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTIcon iconName='geolocation' className='fs-4 me-1' />
                      {car?.type?.name}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {car?.price}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {car?.stock}
                    </a>
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {car?.description}
                    </a>
                  </div>
                </div>

                <div className='d-flex my-4'>
                  <button
                    className='btn btn-sm btn-primary me-3'
                    data-bs-toggle='modal'
                    data-bs-target='#kt_modal_offer_a_deal'
                    onClick={handleRefreshClick}
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div className='d-flex flex-wrap flex-stack'>
                <div className='d-flex flex-column flex-grow-1 pe-8'>
                  <div className='d-flex flex-wrap'></div>
                </div>
                <div className='d-flex align-items-center w-200px w-sm-300px flex-column mt-3'></div>
              </div>
            </div>
          </div>

          <div className='d-flex overflow-auto h-55px'>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              <li className='nav-item'>
                <Link className={`nav-link text-active-primary me-6 active`} to='#'>
                  Overview
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
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
            <label className='col-lg-4 fw-bold text-muted'>Brand</label>

            <div className='col-lg-8'>
              <input
                type='text'
                className='form-control'
                value={car?.brand?.name || ''}
                onChange={(e) => setCar({...car, brand: selectBrand(e.target.value)})}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Type</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <input
                type='email'
                className='form-control'
                value={car?.type?.name || ''}
                onChange={(e) => setCar({...car, type: selectType(e.target.value)})}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Price</label>
            <div className='col-lg-8 d-flex align-items-center'>
              <input
                type='text'
                className='form-control'
                value={car?.price || ''}
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

          {/* <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Showroom</label>

            <div className='col-lg-8 fv-row'>
              <select
                className='form-control'
                value={car?.showroom_id || ''}
                onChange={(e) => {
                  const selectedShowroomId = Number(e.target.value)
                  setCar({...car, showroom_id: selectedShowroomId})
                }}
              >
                <option value=''>Select Showroom</option>
                {showrooms.map((showroom) => (
                  <option key={showroom?.id} value={showroom?.id || ''}>
                    {showroom.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

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
=======
import {CKEditorForm} from "../../../../_metronic/partials/form/ckfinder/CKEditorForm";

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
            updateCar(id, car)
                .then((response) => {
                    const carData = response.data
                    if (carData && !Array.isArray(carData)) {
                        setCar(carData)
                        setCar({...car})
                        toast.success('Cập nhật thông tin thành công', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })

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
                                value={car?.price || ''}
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
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
