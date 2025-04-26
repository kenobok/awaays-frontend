import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckingUser, NetworkStatus } from '../utils/CheckingUser';
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from 'react-toastify';


const Layout = () => {
    const { user, authChecked } = useAuth();
    const location = useLocation();
    const [isOffline, setIsOffline] = useState(false);

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
        console.log({isOffline})
    }, [location.pathname])

    if(isOffline) toast.error('Check your internet connection');
    if (isOffline) return <NetworkStatus />

    const protectedRoutes = [
        '/give-item',
        '/dashboard',
        '/auth',
    ];

    const hideFooterRoutes = [
        '/giveaway-items',
        '/dashboard',
        '/community',
    ];

    const isProtectedRoute = protectedRoutes.some(path =>
        location.pathname.startsWith(path)
    );

    const shouldHideFooter = hideFooterRoutes.some(path =>
        location.pathname.startsWith(path)
    );

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

