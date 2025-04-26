import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CheckingUser } from '../utils/CheckingUser';
import ScrollToTop from "../utils/ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    const { user, authChecked } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log({user})
    }, [location.pathname])

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
        <CheckingUser />
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