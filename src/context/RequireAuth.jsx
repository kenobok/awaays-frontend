import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader1 } from '../components/utils/Preloader';

const RequireAuth = ({ children }) => {
    const { user, authChecked } = useAuth();
    const location = useLocation();

    if (!authChecked) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader1 />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (!user.is_verified && location.pathname !== "/auth/verify-email") {
        return <Navigate to="/auth/verify-email" state={{ from: location }} replace />;
    }

    return children;
};


const CheckUser = ({ children }) => {
    const { user, authChecked } = useAuth();
    const location = useLocation();

    if (!authChecked) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader1 />
            </div>
        );
    }

    if (user) {
        return <Navigate to="/give-item" />
    }
    return children;
};

const CheckVer = ({ children }) => {
    const { user, authChecked } = useAuth();
    const location = useLocation();

    if (!authChecked) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader1 />
            </div>
        );
    }

    if (!user.is_verified && location.pathname !== "/auth/verify-email") return <Navigate to="/auth/verify-email" state={{ from: location }} replace />;
    else if (user.is_verified) return <Navigate to="/give-item" />
    return children;
};


export { RequireAuth, CheckUser, CheckVer };
