import axios from '../../axios';
import { useEffect, useState } from 'react';
import ChangePassword from './ChangePassword';
import './Profile.css'; 

const UserProfile = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        address: '',
        date_of_birth: '',
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('customer/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="user-profile-container">
            <div className="profile-info">
                <h1>User Profile</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input
                            type="text"
                            id="fullname"
                            value={userData.fullname}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={userData.email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">Phone Number:</label>
                        <input
                            type="text"
                            id="phone_number"
                            value={userData.phone_number}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            value={userData.address}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth (mm/dd/yyyy):</label>
                        <input
                            type="text"
                            id="dob"
                            value={new Date(userData.date_of_birth).toLocaleDateString()} 
                            readOnly
                        />
                    </div>
                </form>
            </div>
            <div className="password-section">
                <ChangePassword />
            </div>
        </div>
    );
};

export default UserProfile;
