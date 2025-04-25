import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import API from '../api/axiosInstance';

const fetcher = async (url) => {
    const res = await API.get(url);
    return res.data;
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    const { data: userData, error, isValidating } = useSWR('/account/users/me/', fetcher, {
        revalidateOnFocus: false,
        errorRetryCount: 3,
        onSuccess: () => setAuthChecked(true),
        onError: () => setAuthChecked(true),
    });

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    const login = () => {
        localStorage.setItem('Random', JSON.stringify(true));
        revalidateUser();
    };

    const logout = () => {
        setUser(null);
        // setAuthChecked(false);
        mutate('/account/users/me/', null, false);
    };

    const revalidateUser = useCallback(() => {
        setAuthChecked(false);
        mutate('/account/users/me/');
    }, []);

    return (
        <AuthContext.Provider value={{ user, authChecked, login, logout, revalidateUser, isValidating, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
