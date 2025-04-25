import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader1 } from '../components/utils/Preloader';

const RequireAuth = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const from = location.pathname + location.search;

        if (authChecked) {
            if (!user) {
                navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
            } else if (!user.is_verified) {
                navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
            }
        }
    }, [user, authChecked, location, navigate]);

    if (!authChecked) return ( 
        <div className='relative m-auto bg-[var(--bg-color)] w-[25rem] max-[577px]:w-[90%] h-[15rem] pb-15 z-5 rounded-4xl'>
            <Loader1 />
            <div className='w-[80%] absolute top-[50%] mt-5 max-[577px]:mt-3 max-[437px]:mt-5 left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center'>
                <p className='leading-[1.2rem] font-semibold'>Checking Verification...</p>
                <p className='leading-[1.2rem] text-orange-500'>If this takes too long please refresh the page</p>
            </div>
        </div>
        );    
    if (!user || !user.is_verified) return null;

    return children;
};


const BlockIfSignedIn = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authChecked) {
            if (user?.is_verified) {
                navigate('/give-item', { replace: true });
            } else if (user && !user.is_verified) {
                navigate('/auth/verify-email', { replace: true });
            }
        }
    }, [user, authChecked, navigate]);

    if (!authChecked) return ( 
        <div className='relative m-auto bg-[var(--bg-color)] w-[25rem] max-[577px]:w-[90%] h-[15rem] pb-15 z-5 rounded-4xl'>
            <Loader1 />
            <div className='w-[80%] absolute top-[50%] mt-5 max-[577px]:mt-3 max-[437px]:mt-5 left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center'>
                <p className='leading-[1.2rem] font-semibold'>Checking Verification...</p>
                <p className='leading-[1.2rem] text-orange-500'>If this takes too long please refresh the page</p>
            </div>
        </div>
        );
    if (user?.is_verified || (user && !user.is_verified)) return null;

    return children;
};


const RequireUnverifiedOnly = ({ children }) => {
    const { user, authChecked } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authChecked) {
            if (!user) {
                navigate('/auth', { replace: true });
            } else if (user.is_verified) {
                navigate('/give-item', { replace: true });
            }
        }
    }, [user, authChecked, navigate]);

    if (!authChecked) return ( 
        <div className='relative m-auto bg-[var(--bg-color)] w-[25rem] max-[577px]:w-[90%] h-[15rem] pb-15 z-5 rounded-4xl'>
            <Loader1 />
            <div className='w-[80%] absolute top-[50%] mt-5 max-[577px]:mt-3 max-[437px]:mt-5 left-[50%] transform -translate-x-[50%] -translate-y-[50%] text-center'>
                <p className='leading-[1.2rem] font-semibold'>Checking Verification...</p>
                <p className='leading-[1.2rem] text-orange-500'>If this takes too long please refresh the page</p>
            </div>
        </div>
        );    
    if (!user || user.is_verified) return null;

    return children;
};


export { RequireAuth, BlockIfSignedIn, RequireUnverifiedOnly }
