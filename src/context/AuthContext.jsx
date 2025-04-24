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
    const [isActive, setIsActive] = useState(false);

    const { data: userData, error, isValidating } = useSWR( isActive ? '/account/users/me/' : null, fetcher, {
        revalidateOnFocus: false,
        errorRetryCount: 3,
    });

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
    }, [userData]);

    useEffect(() => {
        const syncAuthState = () => {
            const userStat = JSON.parse(localStorage.getItem('is_active'));
            setIsActive(!!userStat);
        };
    
        syncAuthState();
    
        const handleStorageChange = () => {
            const stored = JSON.parse(localStorage.getItem('is_active'));
            setIsActive(!!stored);
            if (!stored) setUser(null);
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = (res) => {
        if (!res.data.is_verified) {
            localStorage.setItem('is_verified', JSON.stringify(false));
        }
        localStorage.setItem('is_active', JSON.stringify(true));
        localStorage.setItem('is_user', JSON.stringify(true));
        revalidateUser();
        setIsActive(true);
    };

    const logout = () => {
        localStorage.removeItem('is_verified');
        localStorage.removeItem('is_active');
        setUser(null);
        mutate('/account/users/me/', null, false);
    };

    const revalidateUser = useCallback(() => {
        mutate('/account/users/me/');
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, revalidateUser, isValidating, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
