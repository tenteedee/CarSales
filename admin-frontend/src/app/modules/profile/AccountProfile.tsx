import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserByToken } from '../auth/core/_requests';
import { Profile } from './core/models'; // Adjust the import path as needed
import { UserModel } from '../auth/core/_models'; // Ensure the import is correct
import { useAuth } from '../auth/core/Auth';
import axios, { AxiosError } from 'axios';
import { changePasswordAPI } from '../profile/core/requests'; // Adjust the import path for your API call

const AccountProfile: React.FC = () => {
    const { currentUser } = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Basic validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMessage('New passwords do not match.');
            return;
        }

       try {
    const response = await changePasswordAPI(oldPassword, newPassword);
    if (response) {
        setSuccessMessage('Password updated successfully!');
        toast.success('Password updated successfully!');
        // Reset the password fields
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }
} catch (error) {
    const axiosError = error as AxiosError;
    setErrorMessage(axiosError.response?.data?.error || 'An error occurred. Please try again.');
    toast.error(axiosError.response?.data?.error || 'An error occurred. Please try again.');
}
    
    };

    return (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
            <div className='card-header cursor-pointer'>
                <div className='card-title m-0'>
                    <h3 className='fw-bolder m-0'>Profile Details</h3>
                </div>
            </div>
            <div className='card-body p-9'>
                {currentUser ? (
                    <>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Full Name</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{currentUser.fullname}</span>
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Email</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{currentUser.email}</span>
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Phone Number</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{currentUser.phone_number}</span>
                            </div>
                        </div>
                        <div className='row mb-7'>
                            <label className='col-lg-4 fw-bold text-muted'>Address</label>
                            <div className='col-lg-8'>
                                <span className='fw-bolder fs-6 text-dark'>{currentUser.address}</span>
                            </div>
                        </div>

                        {/* Password Change Form */}
                        <div className='row mb-7'>
                            <h4 className='fw-bold text-muted'>Change Password</h4>
                            <form onSubmit={handleChangePassword}>
                                <div className='mb-3'>
                                    <label htmlFor='oldPassword' className='form-label'>Current Password</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='oldPassword'
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='newPassword' className='form-label'>New Password</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='newPassword'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='confirmPassword' className='form-label'>Confirm New Password</label>
                                    <input
                                        type='password'
                                        className='form-control'
                                        id='confirmPassword'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                                {successMessage && <div className='text-success'>{successMessage}</div>}
                                <button type='submit' className='btn btn-primary'>Change Password</button>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>No user data available</p>
                )}
            </div>
        </div>
    );
};

export default AccountProfile;
