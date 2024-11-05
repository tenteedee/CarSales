import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getProfile, updateProfile } from '../core/requests';
import { Profile } from '../core/models';
import { useParams, useNavigate } from 'react-router-dom';
import {KTCard,} from '../../../../_metronic/helpers'

const AccountEdit: React.FC = () => {
    const { id } = useParams<string>(); // Ensure id is correctly typed
    const [user, setUser] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // For navigation after update

    // Fetch profile on component mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getProfile(); // Fetch the profile data
                const userData = response.data;

                if (userData && !Array.isArray(userData)) {
                    setUser(userData);
                } else {
                    setUser(null);
                    toast.error("Invalid user data received or user not found");
                }
            } catch (error: any) {
                const errorMessage =
                    error?.response?.data?.error || "Failed to fetch user details";
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchUser();
    }, [id]);

    // Handle profile update
    const handleUpdate = async () => {
        if (user && id) {
            try {
                await updateProfile(id, );
                toast.success("User updated successfully");
                navigate('/profile'); // Redirect to the profile page
            } catch (error: any) {
                const errorMessage =
                    error?.response?.data?.error || "Failed to update user";
                toast.error(errorMessage);
            }
        }
    };

    // Handle input changes dynamically
    const handleChange = (field: keyof Profile, value: string) => {
        setUser((prevUser) => prevUser ? { ...prevUser, [field]: value } : null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <KTCard>
            <h1>Edit Profile</h1>
            {user && (
                <div>
                    <div>
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={user.fullname || ''}
                            onChange={(e) => handleChange('fullname', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            value={user.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={user.phone_number || ''}
                            onChange={(e) => handleChange('phone_number', e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Address</label>
                        <input
                            type="text"
                            value={user.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                        />
                    </div>
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </KTCard>
    );
};

export default AccountEdit;