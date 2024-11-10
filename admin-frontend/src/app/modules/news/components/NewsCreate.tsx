import React, {FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {News} from '../core/models'
import {QueryResponse} from '../../../utils/model/models'
import {toast} from 'react-toastify'
import {createNews} from '../core/requests'
import {Category} from '../../category/core/models'
import {getCategories} from '../../category/core/requests'
import {uploadImage} from '../../../utils/requests/requests'
import {CKEditorForm} from '../../../../_metronic/partials/form/ckfinder/CKEditorForm'

type Props = {}

export const NewsCreate: FC<Props> = ({...props}) => {
  const navigate = useNavigate()
  const [news, setNews] = useState<Partial<News>>({
    title: '',
    heading: '',
    content: '',
    category_id: 0,
  })
  const [categories, setCategories] = useState<Category[]>([])
  const getData = () => {
    getCategories('')
      .then((response: QueryResponse) => {
        setCategories(response.data || [])
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
  useEffect(() => {
    getData()
  }, [navigate])
  const handleInputChange = (key: string, value: string) => {
    setNews({
      ...news,
      [key]: value,
    })
  }
  const handleCreate = () => {
    createNews(news)
      .then(() => {
        toast.success('Tạo bài viết mới thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        navigate('/news', {state: {reload: true}})
      })
      .catch((error) => {
        const errorMessage =
          error && error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Tạo bài viết mới thất bại, vui lòng thử lại!'
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
  const handleImageUpload = (event: any) => {
    const file = event.target.files[0]
    uploadImage(file)
      .then((url) => {
        setNews({...news, image: url})
      })
      .catch((error) => {
        const errorMessage =
          error && error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : 'Image upload error'
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
            <h3 className='fw-bolder m-0'>Update News</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Image</label>
            <div className='col-lg-8'>
              <input
                type='file'
                className='form-control'
                accept='image/*'
                onChange={handleImageUpload}
              />
              {news?.image && (
                <div className='mt-3'>
                  <img src={news.image} alt='Uploaded' style={{maxWidth: '50%', height: 'auto'}} />
                </div>
              )}
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Title</label>
            <div className='col-lg-8'>
              <textarea
                rows={5}
                name='title'
                className='form-control'
                value={news?.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Heading</label>
            <div className='col-lg-8'>
              <textarea
                rows={5}
                name='heading'
                className='form-control'
                value={news?.heading || ''}
                onChange={(e) => handleInputChange('heading', e.target.value)}
              />
            </div>
          </div>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Category</label>
            <div className='col-lg-8'>
              <select
                className='form-control'
                value={news?.category_id || ''}
                onChange={(e) => {
                  const selectedCategoryId = Number(e.target.value)
                  setNews({...news, category_id: selectedCategoryId})
                }}
              >
                <option value=''>Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id || ''}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Content</label>
            <div className='col-lg-8'>
              <CKEditorForm
                data={{content: news?.content ?? ''}}
                setData={(updatedData) => setNews({...news, content: updatedData.content})}
                fieldName='content'
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
