import React, {FC, useEffect, useState} from 'react'
import {QueryResponse} from '../../../utils/model/models'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'
import {getTestDrive, updateTestDrive} from '../core/requests'
import {TestDrive} from '../core/models'
import {Car} from '../../car/core/models'
import {getCars} from '../../car/core/requests'
import {Staff} from '../../staffs/core/models'
import {getStaffs} from '../../staffs/core/requests'
import {useAuth} from '../../auth'
import moment, {Moment} from 'moment/moment'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
type Props = {}

export const TestDriveEdit: FC<Props> = ({...props}) => {
  const {id} = useParams() // Get ID from URL
  const navigate = useNavigate()
  const [testDrive, setTestDrive] = useState<TestDrive | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cars, setCars] = useState<Car[]>([])
  const [sales, setSales] = useState<Staff[]>([])

  const getData = () => {
    if (id) {
      getTestDrive(id)
        .then((response: QueryResponse) => {
          const testDriveData = response.data
          if (testDriveData && !Array.isArray(testDriveData)) {
            setTestDrive(testDriveData)
          } else {
            setError(true)
            toast.error('Không tìm thấy dữ liệu hoặc dữ liệu không hợp lệ', {
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
      getCars('')
        .then((response: QueryResponse) => {
          setCars(response.data || [])
        })
        .catch((error) => {
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
      getStaffs('search=role_id=2')
        .then((response: QueryResponse) => {
          setSales(response.data || [])
        })
        .catch((error) => {
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
    }
  }
  useEffect(() => {
    getData()
  }, [id, navigate])

  const handleInputChange = (key: string, value: string) => {
    setTestDrive((prevTestDrive) => {
      if (!prevTestDrive) return null
      return {...prevTestDrive, [key]: value}
    })
  }
  const handleDateChange = (date: Moment | string) => {
    if (moment.isMoment(date)) {
      const formattedDate = date.format('YYYY-MM-DD HH:mm:ss')
      handleInputChange('test_drive_date', formattedDate)
    }
  }
  const handleUpdate = () => {
    if (testDrive && id) {
      updateTestDrive(id, testDrive)
        .then(() => {
          toast.success('Cập nhật thành công!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          navigate('/test-drive', {state: {reload: true}})
        })
        .catch((error) => {
          const errorMessage =
            error && error.response && error.response.data && error.response.data.error
              ? error.response.data.error
              : 'Có lỗi xảy ra khi cập nhật'
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
  const {hasRole} = useAuth()

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
            <h3 className='fw-bolder m-0'>Cập nhật yêu cầu lái thử</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Customer</label>
            <div className='col-lg-8'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={testDrive?.customer?.fullname || ''}
                readOnly
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>
            <div className='col-lg-8'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={testDrive?.customer?.email || ''}
                readOnly
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Phone number</label>
            <div className='col-lg-8'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={testDrive?.customer?.phone_number || ''}
                readOnly
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Car</label>
            <div className='col-lg-8'>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                value={testDrive?.car?.model || ''}
                readOnly
              />
            </div>
          </div>

          {hasRole('Director') && (
            <div className='row mb-7'>
              <label className='col-lg-4 fw-bold text-muted'>Sale</label>
              <div className='col-lg-8'>
                <select
                  className='form-control'
                  value={testDrive?.sales_staff_id || ''}
                  onChange={(e) => {
                    const selected = Number(e.target.value)
                    setTestDrive({...testDrive, sales_staff_id: selected})
                  }}
                >
                  <option value=''>Select Sale</option>
                  {sales
                    .filter(
                      (sale) => sale.role_id === 2 && sale.showroom_id === testDrive?.showroom_id
                    )
                    .map((sale) => (
                      <option key={sale.id} value={sale.id || ''}>
                        {sale.fullname} - {sale.email}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Date Test</label>
            <div className='col-lg-8'>
              <Datetime
                value={testDrive?.test_drive_date ? moment(testDrive.test_drive_date) : ''}
                dateFormat='YYYY-MM-DD'
                timeFormat='HH:mm:ss'
                onChange={handleDateChange}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Status</label>
            <div className='col-lg-8'>
              <select
                className='form-control'
                value={testDrive?.status || ''}
                onChange={(e) => {
                  const selected = e.target.value
                  setTestDrive({...testDrive, status: selected})
                }}
              >
                <option value=''>Select Car</option>
                <option key={testDrive?.id} value={'pending'}>
                  Pending
                </option>
                <option key={testDrive?.id} value={'approved'}>
                  Approved
                </option>
                <option key={testDrive?.id} value={'completed'}>
                  Completed
                </option>
                <option key={testDrive?.id} value={'cancelled'}>
                  Cancelled
                </option>
              </select>
            </div>
          </div>
          <div className='d-flex my-4'>
            <button className='btn btn-primary' onClick={handleUpdate}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
