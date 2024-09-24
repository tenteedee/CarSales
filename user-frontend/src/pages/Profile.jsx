import axios from '../axios';
import { useEffect, useState } from 'react';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('customer/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!userData) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {userData.fullname}</p>
            <p>Email: {userData.email}</p>
            <p>Address: {userData.phone_number}</p>
            <p>Phone Number: {userData.address}</p>
            <p>Date of birth: {userData.date_of_birth}</p>
        </div>
    );
};

export default UserProfile;
