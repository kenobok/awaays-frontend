import React from 'react';
import { RouterProvider } from 'react-router-dom';
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



// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="p-4 bg-blue-600 text-white flex justify-between">
//       <Link to="/" className="text-lg font-bold">Giveaway</Link>
      
//       {user ? (
//         <div>
//           <span>Welcome, {user.name}!</span>
//           <button onClick={logout} className="ml-4 bg-red-500 px-2 py-1 rounded">
//             Logout
//           </button>
//         </div>
//       ) : (
//         <Link to="/login" className="bg-green-500 px-3 py-1 rounded">Login</Link>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
