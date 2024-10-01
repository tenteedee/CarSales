import { useState } from 'react';
import axios from '../../axios';
import './ChangePassword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const passwordRegex = /^[^\s]{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            setMessage('Invalid Password! Make a strong password');
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('auth/change-password', {
                oldPassword,
                newPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setMessage("Password changed successfully!");
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage("Old password is incorrect!");
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handlePasswordChange}>
                <div>
                    <label>Old Password:</label>
                    <input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Confirm New Password:</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
