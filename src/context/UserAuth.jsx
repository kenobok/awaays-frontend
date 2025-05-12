import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckingUser } from '../components/utils/CheckingUser';


const RequireAuth = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!authChecked) return;

        const from = location.pathname + location.search;

        if (!user) {
            navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
        } else if (!user.is_verified) {
            navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
        }
    }, [authChecked, user, location, navigate]);

    if (!authChecked || !user || !user.is_verified) return (<CheckingUser />)

    return children;
};


const BlockIfSignedIn = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!authChecked) return;

        const searchParams = new URLSearchParams(location.search);
        const from = searchParams.get('from') || '/give-item';

        if (user) {
            if (user.is_verified) {
                if (
                    from === '/auth' || 
                    from === '/auth/' || 
                    from.includes('verify-email') || 
                    from.includes('reset-password')
                ) {
                    navigate( '/give-item', { replace: true });
                } else {
                    navigate( from, { replace: true });
                }
            }
        } else {
            if (location.pathname.includes('verify-email')) {
                navigate('/auth', { replace: true })
            }
        }
    }, [user, authChecked, location.pathname, navigate]);

    if (!authChecked) return <CheckingUser />;

    return children;
};


export { RequireAuth, BlockIfSignedIn }

