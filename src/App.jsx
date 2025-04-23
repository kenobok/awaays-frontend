import { useState, useEffect } from 'react';
import axios from 'axios';
import { RouterProvider } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import router from './router';
import { getCookie } from './components/utils/csrf';
import './App.css';


const App = () => {
    
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/api/account/csrf/', { withCredentials: true })
            .then(() => console.log("CSRF cookie set"))
            .catch(err => console.error("Failed to fetch CSRF", err));

        // Check the CSRF token in cookies
        const csrfToken = getCookie('csrftoken');
        console.log('CSRF Token from getCookie:', csrfToken);
    }, []);

    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App;




