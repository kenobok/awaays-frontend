import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckingUser, NetworkStatus } from '../utils/CheckingUser';
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";
import { toast } from 'react-toastify';


const Layout = () => {
    const navigate = useNavigate();
    const { user, authChecked, errorFetchingData, error } = useAuth();
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

    useEffect(() => {
        console.log({user})
        // console.log({isOffline})
    }, [location.pathname])

    useEffect(() => {
        if(isProtectedRoute && errorFetchingData) toast.error('Authentication failed, check internet connection OR Sign in')
    }, [errorFetchingData, authChecked, user, error])

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

