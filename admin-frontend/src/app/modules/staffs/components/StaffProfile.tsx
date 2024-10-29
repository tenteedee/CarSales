import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStaff, updateStaffPassword } from '../core/requests';
import { toast } from 'react-toastify';

type StaffData = {
  fullname: string;
  email: string;
  password?: string;
};

const StaffProfilePage = () => {
  const { id } = useParams<string>();
  const [staff, setStaff] = useState<StaffData | null>(null);

  useEffect(() => {
    if (id) {
      getStaff(id).then(response => {
        const staffData = response.data;
        if (staffData && !Array.isArray(staffData)) {
          setStaff(staffData);
        } else {
          setStaff(null);
          toast.error("Invalid staff data received or staff not found", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }).catch(error => {
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Failed to fetch staff details";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setStaff(null);
      });
    }
  }, [id]);

  const validatePassword = (password: string) => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/)) {
      return "Password must be at least 6 characters long and include uppercase, lowercase, numbers, and special characters";
    }
    return null;
  };

  const handlePasswordChange = (newPassword: string) => {
    const error = validatePassword(newPassword);
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (id && newPassword) {
      updateStaffPassword(id, newPassword).then(() => {
        toast.success("Password updated successfully");
      }).catch(error => {
        const errorMessage = error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Failed to update password";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    }
  };

  return (
    <div>
      <h1>Staff Profile</h1>
      {staff && (
        <>
          <p>Name: {staff.fullname}</p>
          <p>Email: {staff.email}</p>
          <button onClick={() => handlePasswordChange(staff.password || '')}>Change Password</button>
        </>
      )}
    </div>
  );
};

export default StaffProfilePage;