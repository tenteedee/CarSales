/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login, LOGIN_WITH_GOOGLE_URL} from '../core/_requests'
import {useAuth} from '../core/Auth'
import axios from "axios";
import {AuthModel} from "../core/_models";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format')
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Email is required'),
    password: Yup.string()
        .min(3, 'Minimum 3 symbols')
        .max(50, 'Maximum 50 symbols')
        .required('Password is required'),
})

const initialValues = {
    email: 'admin@demo.com',
    password: '122333',
}

export function Login() {
    const [loading, setLoading] = useState(false)
    const {saveAuth, setCurrentUser} = useAuth()
    const [errorMessage, setErrorMessage] = useState("")

    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, {setStatus, setSubmitting}) => {
            setLoading(true)
            try {
                const {data: auth} = await login(values.email, values.password)
                saveAuth(auth)
                const {data: user} = await getUserByToken(auth.api_token)
                setCurrentUser(user)
            } catch (error) {
                console.error(error)
                saveAuth(undefined)
                setStatus('The login details are incorrect')
                setSubmitting(false)
                setLoading(false)
            }
        },
    })
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
    const handleLoginSuccess = async (credentialResponse: any) => {
        try {
            const token = credentialResponse.credential;
            const {data: auth} = await axios.post<AuthModel>(LOGIN_WITH_GOOGLE_URL, {
                token: token,
            });
            saveAuth(auth);
            const {data: user} = await getUserByToken(auth.api_token)
            setCurrentUser(user);
        } catch (error) {
            saveAuth(undefined)
            setLoading(false)
            setErrorMessage("The login details are incorrect")
        }
    };

    const handleLoginFailure = () => {
        setErrorMessage("Google login failed")
        saveAuth(undefined)
        setLoading(false)
    };
    return (
        <form
            className='form w-100'
            onSubmit={formik.handleSubmit}
            noValidate
            id='kt_login_signin_form'
        >
            {/* begin::Heading */}
            <div className='text-center mb-11'>
                <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
                <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
            </div>
            {/* begin::Heading */}

            {/* begin::Login options */}
            <div className='row g-3 mb-9'>
                {/* begin::Col */}
                <div className='col-12 d-flex justify-content-center'> {/* Center the button */}
                    {/* begin::Google link */}
                    <GoogleOAuthProvider clientId={clientId}>
                        <div className="google-login-wrapper"> {/* Wrapper to control button alignment */}
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginFailure}
                                useOneTap={true}  // Optional: Enable One-Tap login
                                containerProps={{
                                    className: '',  // Leave this empty to avoid overriding Google button styles
                                }}
                            />
                        </div>
                    </GoogleOAuthProvider>
                    {/* end::Google link */}
                </div>
                {/* end::Col */}
            </div>
            {/* end::Login options */}

            {/* begin::Separator */}
            <div className='separator separator-content my-14'>
                <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span>
            </div>
            {/* end::Separator */}
            {errorMessage ? (
                <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>{errorMessage}</div>
                </div>
            ) : ""}

            {formik.status ? (
                <div className='mb-lg-15 alert alert-danger'>
                    <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
            ) : ""}

            {/* begin::Form group */}
            <div className='fv-row mb-8'>
                <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
                <input
                    placeholder='Email'
                    {...formik.getFieldProps('email')}
                    className={clsx(
                        'form-control bg-transparent',
                        {'is-invalid': formik.touched.email && formik.errors.email},
                        {
                            'is-valid': formik.touched.email && !formik.errors.email,
                        }
                    )}
                    type='email'
                    name='email'
                    autoComplete='off'
                />
                {formik.touched.email && formik.errors.email && (
                    <div className='fv-plugins-message-container'>
                        <span role='alert'>{formik.errors.email}</span>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group */}
            <div className='fv-row mb-3'>
                <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
                <input
                    type='password'
                    autoComplete='off'
                    {...formik.getFieldProps('password')}
                    className={clsx(
                        'form-control bg-transparent',
                        {
                            'is-invalid': formik.touched.password && formik.errors.password,
                        },
                        {
                            'is-valid': formik.touched.password && !formik.errors.password,
                        }
                    )}
                />
                {formik.touched.password && formik.errors.password && (
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.password}</span>
                        </div>
                    </div>
                )}
            </div>
            {/* end::Form group */}

            {/* begin::Wrapper */}
            <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
                <div/>

                {/* begin::Link */}
                <Link to='/auth/forgot-password' className='link-primary'>
                    Forgot Password ?
                </Link>
                {/* end::Link */}
            </div>
            {/* end::Wrapper */}

            {/* begin::Action */}
            <div className='d-grid mb-10'>
                <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-primary'
                    disabled={formik.isSubmitting || !formik.isValid}
                >
                    {!loading && <span className='indicator-label'>Continue</span>}
                    {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
                    )}
                </button>
            </div>
            {/* end::Action */}
        </form>
    )
}
