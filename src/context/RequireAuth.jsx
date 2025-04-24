import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader1 } from '../components/utils/Preloader';

const RequireAuth = ({ children }) => {
    const { user, authChecked } = useAuth();
    const location = useLocation();

    if (!authChecked) {
        return <Loader1 />;
    }

    if (!user) {
        return <Navigate to={`/auth?from=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    if (!user.is_verified) {
        return <Navigate to={`/auth/verify-email?from=${encodeURIComponent(location.pathname + location.search)}`} replace />;
    }

    return children;
};


export {RequireAuth};
