import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckingUser, NetworkStatus } from '../components/utils/CheckingUser';


const RequireAuth = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const [isOffline, setIsOffline] = useState(false)

    // useEffect(() => {
    //     const handleOnline = () => setIsOffline(false);
    //     const handleOffline = () => setIsOffline(true);
    
    //     window.addEventListener('online', handleOnline);
    //     window.addEventListener('offline', handleOffline);
    
    //     setIsOffline(!navigator.onLine);
    
    //     return () => {
    //         window.removeEventListener('online', handleOnline);
    //         window.removeEventListener('offline', handleOffline);
    //     };
    // }, []);

    useEffect(() => {
        if (!authChecked) return;

        const from = location.pathname + location.search;

        // if(isOffline) toast.error('Check your internet connection');

        // if (!isOffline) {
            if (!user) {
                navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
            } else if (!user.is_verified) {
                navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
            }
        // }
    }, [authChecked, user, location, navigate]);

    if (!authChecked || !user || !user.is_verified) return (<CheckingUser />)

    // if (isOffline) return (<NetworkStatus />)

    return children;
};


const BlockIfSignedIn = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!authChecked) return;

        const from = (location.pathname + location.search) || '/give-item';
        const isAuthPage = ['/auth', '/auth/reset-password', '/auth/verify-email'].some(path => from.startsWith(path));
        const isVerifyEmailPage = from.startsWith('/auth/verify-email');

        if (user) {
            if (user.is_verified) {
                if (isAuthPage) {
                    navigate('/give-item', { replace: true });
                }
            } else {
                if (!isVerifyEmailPage) {
                    navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
                }
            }
        } else {
            if (isVerifyEmailPage) {
                navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
            }
        }
    }, [user, authChecked, location, navigate]);

    if (!authChecked) return <CheckingUser />;

    return children;
};


export { RequireAuth, BlockIfSignedIn }

