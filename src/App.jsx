import React from 'react';
import { RouterProvider, useNavigate } from 'react-router-dom';
import ContextProvider from './context/ContextProvider';
import router from './router';
import './App.css';


const App = () => {

    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App;




