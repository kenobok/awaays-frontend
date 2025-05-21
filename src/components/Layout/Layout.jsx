import { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { useUserLocation } from '/src/hooks/useUserLocationFromAPI';
import { useAuth } from '../../context/AuthContext';
import { CheckingUser, NetworkStatus } from '../utils/CheckingUser';
import { usePrefetchData } from '../../hooks/usePrefetchedData'; 
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from 'react-toastify';


const Layout = () => {
    const { locationFromApi } = useUserLocation();
    const { user, authChecked, isError } = useAuth();
    const location = useLocation();
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

    // useEffect(() => {
    //     console.log({user})
    // }, [location.pathname])

    usePrefetchData();

    useEffect(() => {
        if(isProtectedRoute && isError) toast.error('Authentication failed, check internet connection OR Sign in')
    }, [isError, authChecked, user])

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


