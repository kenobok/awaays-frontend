import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        window.dispatchEvent(new Event('authChanged')); // custom event
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('authChanged')); // custom event
    };

    // Listen for changes (useful for multiple tabs or manual localStorage updates)
    useEffect(() => {
        const syncAuth = () => {
            const storedUser = localStorage.getItem('user');
            setUser(storedUser ? JSON.parse(storedUser) : null);
        };

        window.addEventListener('authChanged', syncAuth);
        window.addEventListener('storage', syncAuth); // for other tabs

        return () => {
            window.removeEventListener('authChanged', syncAuth);
            window.removeEventListener('storage', syncAuth);
        };
    }, []);

    const isLoggedIn = !!user;
    const isVerified = user?.is_verified ?? false;

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isVerified, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
