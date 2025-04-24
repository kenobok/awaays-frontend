import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axiosInstance'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const fetchUser = async (retry = 1) => {
        try {
            const res = await API.get('/account/users/me/');
            setUser(res.data);
        } catch (err) {
            if (retry > 0) return fetchUser(retry - 1);
            if (!user) setUser(null);
            console.error('Fetch user failed after retry:', err.message);
        } finally {
            setAuthChecked(true);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, authChecked }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

