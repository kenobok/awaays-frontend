import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import router from './router';
import { getCSRFToken } from './components/utils/csrf';
import './App.css';


const App = () => {
    
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




