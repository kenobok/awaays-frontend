import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import router from './router';
import { useQueryClient } from '@tanstack/react-query';
import { fetchMe, fetchGiveaways } from './services/fetchServices';
import { getCSRFToken } from './components/utils/csrf';
import './App.css';


const App = () => {

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ['auth-user'],
            queryFn: fetchMe,
            staleTime: 5 * 60 * 1000,
            retry: 2, 
        });

        queryClient.prefetchQuery({
            queryKey: ['giveaway-items'],
            queryFn: fetchGiveaways,
            staleTime: 5 * 60 * 1000,
            retry: 2, 
        });
    }, [queryClient]);

    useEffect(() => {
        getCSRFToken()
    }, []);

    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App;




