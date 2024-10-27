import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {CarCreateWrapper, CarEditWrapper, CarListWrapper} from './Cars'

const carsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Car Management',
    path: '/car',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const CarsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          index
          element={
            <>
              <PageTitle breadcrumbs={carsBreadcrumbs}>Cars list</PageTitle>
              <CarListWrapper />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={carsBreadcrumbs}>Create Car</PageTitle>
              <CarCreateWrapper />
            </>
          }
        />
        <Route
          path='edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={carsBreadcrumbs}>Edit Car</PageTitle>
              <CarEditWrapper />
            </>
          }
        />
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

export default CarsPage
