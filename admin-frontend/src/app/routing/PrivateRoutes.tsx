import {FC, Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
<<<<<<< HEAD
import StaffsPage from '../modules/staffs/StaffsPage'
import {useAuth} from '../modules/auth'
import SettingsPage from '../modules/settings/SettingsPage'
import NewsPage from '../modules/news/NewsPage'
import CategoryPage from '../modules/category/CategoryPage'
import TestDrivePage from '../modules/test-drive-request/TestDrivePage'
import ShowroomPage from '../modules/showroom/ShowroomPage'
import CarsPage from '../modules/car/CarsPage'

const PrivateRoutes = () => {
  const {hasRole} = useAuth()
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='/' element={<DashboardWrapper />} />
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        {(hasRole('Director') || hasRole('Sale')) && (
          <Route
            path='test-drive/*'
            element={
              <SuspensedView>
                <TestDrivePage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='staffs/*'
            element={
              <SuspensedView>
                <StaffsPage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='categories/*'
            element={
              <SuspensedView>
                <CategoryPage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='showrooms/*'
            element={
              <SuspensedView>
                <ShowroomPage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='settings/*'
            element={
              <SuspensedView>
                <SettingsPage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='news/*'
            element={
              <SuspensedView>
                <NewsPage />
              </SuspensedView>
            }
          />
        )}
        {hasRole('Director') && (
          <Route
            path='car/*'
            element={
              <SuspensedView>
                <CarsPage />
              </SuspensedView>
            }
          />
        )}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
=======
import StaffPage from "../modules/staffs/StaffsPage";
import {useAuth} from "../modules/auth";
import SettingsPage from "../modules/settings/SettingsPage";
import NewsPage from "../modules/news/NewsPage";
import CategoryPage from "../modules/category/CategoryPage";
import TestDrivePage from "../modules/test-drive-request/TestDrivePage";
import ShowroomPage from "../modules/showroom/ShowroomPage";
import CustomerPage from "../modules/customer/CustomerPage";
import CarsPage from "../modules/car/CarsPage";

const PrivateRoutes = () => {
    const {hasRole} = useAuth()
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>
                {/* Pages */}
                <Route path='/' element={<DashboardWrapper/>}/>
                <Route path='dashboard' element={<DashboardWrapper/>}/>
                <Route path='builder' element={<BuilderPageWrapper/>}/>
                <Route path='menu-test' element={<MenuTestPage/>}/>
                {/* Lazy Modules */}
                {(hasRole("Director") || hasRole("Sale")) && (
                    <Route
                        path='test-drive/*'
                        element={
                            <SuspensedView>
                                <TestDrivePage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='staffs/*'
                        element={
                            <SuspensedView>
                                <StaffPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='customers/*'
                        element={
                            <SuspensedView>
                                <CustomerPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='categories/*'
                        element={
                            <SuspensedView>
                                <CategoryPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='showrooms/*'
                        element={
                            <SuspensedView>
                                <ShowroomPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='settings/*'
                        element={
                            <SuspensedView>
                                <SettingsPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole("Director") && (
                    <Route
                        path='news/*'
                        element={
                            <SuspensedView>
                                <NewsPage/>
                            </SuspensedView>
                        }
                    />
                )}
                {hasRole('Director') && (
                    <Route
                        path='cars/*'
                        element={
                            <SuspensedView>
                                <CarsPage />
                            </SuspensedView>
                        }
                    />
                )}
                {/* Page Not Found */}
                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
>>>>>>> 9cc06efd1fd29e13b24a720c79354ebe1f368e86
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
