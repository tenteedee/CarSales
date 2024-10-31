import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUserByToken } from '../auth/core/_requests';
import { Profile } from './core/models'; // Adjust the import path as needed
import { UserModel } from '../auth/core/_models'; // Ensure the import is correct

const AccountProfile: React.FC = () => {
    const [user, setUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('api_token');

        if (token) {
            getUserByToken(token)
                .then(response => {
                    const userData: UserModel = response.data;
                    if (userData) {
                        setUser({
                            id: userData.id ?? 0, // Default id value
                            fullname: userData.fullname || 'Unknown', // Default fullname
                            email: userData.email || 'No email provided', // Default email
                            phone_number: userData.phone_number || 'N/A', // Default phone number
                            address: userData.address || 'N/A', // Default address
                        });
                    } else {
                        toast.error("Invalid user data received");
                    }
                })
                .catch(error => {
                    const errorMessage = error?.response?.data?.error || "Failed to fetch user details";
                    toast.error(errorMessage);
                })
                .finally(() => setLoading(false));
        } else {
            toast.error("No authentication token found");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Account Profile</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.fullname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phone_number}</p>
                    <p><strong>Address:</strong> {user.address}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default AccountProfile;
