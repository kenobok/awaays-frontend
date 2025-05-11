import { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useUserLocation } from '/src/hooks/useUserLocationFromAPI';
import { useAuth } from '../../context/AuthContext';
import { CheckingUser, NetworkStatus } from '../utils/CheckingUser';
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from 'react-toastify';

import { useQueryClient } from '@tanstack/react-query';
import { fetchCollectedGiveaways, fetchAllGiveaways, fetchForums, fetchForumsConversations } from '../../services/fetchServices';


const Layout = () => {
    const { locationFromApi } = useUserLocation();
    const navigate = useNavigate();
    const { user, authChecked, errorFetchingData, error } = useAuth();
    const location = useLocation();
    const queryClient = useQueryClient();
    const [isOffline, setIsOffline] = useState(false);

    const protectedRoutes = ['/give-item', '/dashboard', '/auth'];
    const hideFooterRoutes = ['/giveaway-items', '/dashboard', '/community'];
    const isProtectedRoute = protectedRoutes.some(path => location.pathname.startsWith(path));
    const shouldHideFooter = hideFooterRoutes.some(path => location.pathname.startsWith(path));

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
    
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
    
        setIsOffline(!navigator.onLine);
    
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [isOffline, location.pathname, user, authChecked]);

    useEffect(() => {
        console.log({user})
        // console.log({isOffline})
    }, [location.pathname])

    useEffect(() => {
        if(isProtectedRoute && errorFetchingData) toast.error('Authentication failed, check internet connection OR Sign in')
    }, [errorFetchingData, authChecked, user, error])

    useEffect(() => {
        const prefetchData = async () => {
            try {
                await queryClient.fetchQuery({
                    queryKey: ['all-giveaway-items'],
                    queryFn: fetchAllGiveaways,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['collected-items'],
                    queryFn: fetchCollectedGiveaways,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['forums-list'],
                    queryFn: fetchForums,
                    staleTime: 1000 * 60 * 60,
                });

                await queryClient.prefetchQuery({
                    queryKey: ['forums-conversations'],
                    queryFn: fetchForumsConversations,
                    staleTime: 1000 * 60 * 60,
                });
            } catch (error) {
                console.error('Prefetching failed:', error);
            }
        };
        
        const handle = window.requestIdleCallback
            ? requestIdleCallback(() => {
                prefetchData();
            })
            : setTimeout(() => {
                prefetchData();
            }, 5000);
            
        return () => {
            if (window.cancelIdleCallback && typeof handle === 'number') {
                cancelIdleCallback(handle);
            } else {
                clearTimeout(handle);
            }
        };
    }, []);


    if(isOffline) toast.error('Check your internet connection');
    if (isOffline) return <NetworkStatus />

    if (isProtectedRoute && !authChecked) return (
        <CheckingUser/>
    );

    return (
        <>
            <Header />
            <ScrollToTop />
            <Outlet />
            {!shouldHideFooter && <Footer />}
        </>
    );
}

export default Layout;

