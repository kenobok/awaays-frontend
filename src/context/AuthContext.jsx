import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axiosInstance'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const storedUser = JSON.parse(localStorage.getItem('user'));
    //         setUser(storedUser);
    //     };

    //     window.addEventListener('storage', handleStorageChange);

    //     return () => {
    //         window.removeEventListener('storage', handleStorageChange);
    //     };
    // }, []);

    const fetchUser = async () => {
        try {
            const res = await axios.get('/account/users/me/');
            setUser(res.data);
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // const login = (userData) => {
    //     setUser(userData);
    //     localStorage.setItem('user', JSON.stringify(userData));
    // };

    // const logout = () => {
    //     setUser(null);
    //     localStorage.removeItem('user');
    // };

    // const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

