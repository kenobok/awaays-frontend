import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashboardNav from '../../components/account/DashboardNav';
import '../../assets/styles/account.css';


const Dashboard = () => {
    const [toggleDashMenu, setToggleDashMenu] = useState(false)


    return (
        <main className="dashboard flex relative mt-[5rem] max-[941px]:mt-[4rem]">
            <FontAwesomeIcon icon="upload" className={`text-purple-800 bg-[var(--bg-color)] cursor-pointer transition duration-500 shadow-lg ${toggleDashMenu ? 'visible bg-purple-900 transition duration-500' : ''}`} onClick={() => setToggleDashMenu(prev => !prev)} />
            <DashboardNav toggleDashMenu={toggleDashMenu} onLinkClick={() => setToggleDashMenu(false)}/>
            <Outlet />
        </main>
    )
}

export default Dashboard
