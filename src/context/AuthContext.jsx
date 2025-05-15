import { createContext, useContext, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMe } from '../services/fetchServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data: user, isLoading, isError, refetch, error, isFetching } = useQuery({
        queryKey: ['auth-user'],
        queryFn: fetchMe,
        staleTime: 5 * 60 * 1000, 
        retry: 2,
        refetchOnWindowFocus: true
    });

    const authChecked = !isLoading && !isFetching;

    const login = useCallback(() => {
        localStorage.setItem('Random', JSON.stringify(true));
        refetch(); 
    }, [refetch]);

    const logout = useCallback(() => {
        queryClient.removeQueries(['auth-user']);
        window.location.href = '/';
    }, [queryClient]);

    const updateUser = useCallback((newUserData) => {
        queryClient.setQueryData(['auth-user'], (oldData) => ({
            ...oldData,
            ...newUserData,
        }));
    }, [queryClient]);

    return (
        <AuthContext.Provider value={{ user, authChecked, refetch, login, logout, updateUser, isError, error, isFetching }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

