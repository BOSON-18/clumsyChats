import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setOtherUsers } from '../redux/userSlice';
import toast from 'react-hot-toast';

// Helper function to delete a cookie
const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user`);

                if (res.status === 401) {
                    deleteCookie('token'); // Clear the token cookie
                    navigate("/login");
                    toast.error("Session Expired. Please Login Again");
                    return;
                }

                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    deleteCookie('authToken'); // Clear the token cookie
                    navigate("/login");
                    toast.error("Session Expired. Please Login Again");
                } else {
                    toast.error("An error occurred while fetching users.");
                }
            }
        };

        fetchOtherUsers();
    }, [dispatch, navigate]);

    return null; // This hook doesn't render anything itself
}

export default useGetOtherUsers;
