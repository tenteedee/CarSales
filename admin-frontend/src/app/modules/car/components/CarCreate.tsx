import React, {ChangeEvent, FC, useState} from 'react'
import {createCar, getBrands, getTypes} from '../core/requests'
<<<<<<< HEAD
import {Car, Brand, Type} from '../core/models'
import {toast} from 'react-toastify'
import {RoleModel} from '../../auth'
import {useNavigate} from 'react-router-dom'
import {ID} from '../../../../_metronic/helpers'
import {QueryResponse} from '../../../utils/model/models'

type Props = {}
export const CarCreate: FC<Props> = () => {
  const navigate = useNavigate()

  const [car, setCar] = useState<Partial<Car>>({
    model: '',
    brand: undefined,
    type: undefined,
    price: 0,
    stock: 0,
    description: '',
  })

  const [brands, setBrands] = useState<Brand[]>([])
  const [types, setTypes] = useState<Type[]>([])

  React.useEffect(() => {
    getBrands()
      .then((response) => {
        // console.log(response)
        setBrands(response as Brand[])
      })
      .catch((error) => console.error('Error fetching brands:', error))

    getTypes()
      .then((response) => {
        // console.log(response)
        setTypes(response as Type[])
      })
      .catch((error) => console.error('Error fetching types:', error))

    console.log(car)
  }, [car])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    })
  }

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedBrandId = e.target.value
    const selectedBrand = brands.find((brand) => brand.id == selectedBrandId)
    setCar({
      ...car,
      brand: selectedBrand,
    })
  }

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTypeId = e.target.value
    const selectedType = types.find((type) => type.id == selectedTypeId)
    setCar({
      ...car,
      type: selectedType,
    })
  }

  const handleCreate = () => {
    createCar(car)
      .then(() => {
        toast.success('Tạo xe thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate('/cars', {state: {reload: true}})
      })
      .catch((error) => {
        const errorMessage =
          error && error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Tạo xe thất bại, vui lòng thử lại!'
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

  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Car create</h3>
          </div>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Model</label>
            <div className='col-lg-8'>
              <input
                type='text'
                name='model'
                className='form-control'
                value={car.model || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Brand</label>
            <div className='col-lg-8'>
              <select
                className='form-control'
                value={car.brand?.id || ''}
                onChange={handleBrandChange}
              >
                <option value=''>Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id || ''}>
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
                value={car.type?.id || ''}
                onChange={handleTypeChange}
              >
                <option value=''>Select type</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Price</label>
            <div className='col-lg-8'>
              <input
                type='text'
                name='price'
                className='form-control'
                value={car.price || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Description</label>
            <div className='col-lg-8'>
              <input
                type='text'
                name='description'
                className='form-control'
                value={car.description || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Stock</label>
            <div className='col-lg-8'>
              <input
                type='number'
                name='stock'
                className='form-control'
                value={car.stock || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className='d-flex my-4'>
            <button className='btn btn-primary' onClick={handleCreate}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
=======
import {Brand, Car, Type} from '../core/models'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {CKEditorForm} from "../../../../_metronic/partials/form/ckfinder/CKEditorForm";

type Props = {}
export const CarCreate: FC<Props> = () => {
    const navigate = useNavigate()

    const [car, setCar] = useState<Partial<Car>>({
        model: '',
        brand: undefined,
        type: undefined,
        price: 0,
        stock: 0,
        description: '',
    })

    const [brands, setBrands] = useState<Brand[]>([])
    const [types, setTypes] = useState<Type[]>([])

    React.useEffect(() => {
        getBrands()
            .then((response) => {
                // console.log(response)
                setBrands(response.data as Brand[])
            })
            .catch((error) => console.error('Error fetching brands:', error))

        getTypes()
            .then((response) => {
                setTypes(response.data as Type[])
            })
            .catch((error) => console.error('Error fetching types:', error))
    }, [navigate])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCar({
            ...car,
            [e.target.name]: e.target.value,
        })
    }

    const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedBrandId = e.target.value
        const selectedBrand = brands.find((brand) => brand.id == selectedBrandId)
        setCar({
            ...car,
            brand: selectedBrand,
        })
    }

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedTypeId = e.target.value
        const selectedType = types.find((type) => type.id == selectedTypeId)
        setCar({
            ...car,
            type: selectedType,
        })
    }

    const handleCreate = () => {
        createCar(car)
            .then(() => {
                toast.success('Tạo xe thành công!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate('/cars', {state: {reload: true}})
            })
            .catch((error) => {
                const errorMessage =
                    error && error.response && error.response.data && error.response.data.error
                        ? error.response.data.error
                        : 'Tạo xe thất bại, vui lòng thử lại!'
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

    return (
        <>
            <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                <div className='card-header cursor-pointer'>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Car create</h3>
                    </div>
                </div>

                <div className='card-body p-9'>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Model</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='model'
                                className='form-control'
                                value={car.model || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Brand</label>
                        <div className='col-lg-8'>
                            <select
                                className='form-control'
                                value={car.brand?.id || ''}
                                onChange={handleBrandChange}
                            >
                                <option value=''>Select a brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id || ''}>
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
                                value={car.type?.id || ''}
                                onChange={handleTypeChange}
                            >
                                <option value=''>Select type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Price</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='price'
                                className='form-control'
                                value={car.price || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Description</label>
                        <div className='col-lg-8'>
                            <input
                                type='text'
                                name='description'
                                className='form-control'
                                value={car.description || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className='row mb-7'>
                        <label className='col-lg-4 fw-bold text-muted'>Stock</label>
                        <div className='col-lg-8'>
                            <input
                                type='number'
                                name='stock'
                                className='form-control'
                                value={car.stock || ''}
                                onChange={handleInputChange}
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
                        <button className='btn btn-primary' onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
