import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from "react-toastify";
import API from "/src/api/axiosInstance";
import { LogoutLoader } from '../utils/Preloader';


const DashboardNav = ({ toggleDashMenu, onLinkClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dashMenuRef = useRef()
    const [loading, setLoading] = useState(false);
    const {user, setUser} = useAuth();


    const menuItems = [
        { path: "/dashboard", icon: "th-large", label: "Dashboard" },
        { path: "/dashboard/profile", icon: "user-cog", label: "Profile" },
        { path: "/dashboard/messages", icon: "envelope", label: "Messages" },
        { path: "/dashboard/my-giveaways", icon: "people-carry", label: "My Giveaways" },
        { path: "/dashboard/item-requests", icon: "hand-holding", label: "Item Requests" },
        { path: "/dashboard/my-requests", icon: "hand-holding-heart", label: "My Requests" },
        { path: "/dashboard/received-items", icon: "boxes", label: "Received Items" },
        { path: "/dashboard/forums-and-groups", icon: "users", label: "Forums & Groups" },
        { path: "", icon: "sign-out", label: "Logout" },
    
        {/* <li><Link>User Management</Link></li>
            <li><Link>Giveaway Management</Link></li>
            <li><Link>Community Moderation</Link></li>
            <li><Link>Leaderboard Control</Link></li>
            <li><Link>Forum Management</Link></li>
            <li><Link>Group Management</Link></li>
            <li><Link>Admin Messaging System</Link></li> */}
    ];

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (e) => {
        if (dashMenuRef.current && !dashMenuRef.current.contains(e.target)) {
            onLinkClick();
        }
    };

    const handleLogout = async () => {
        setLoading(true)
        try {
            await API.post("/account/logout/");
            toast.success("You’ve been logged out.");
            setUser(null);
            navigate('/');
        } catch (error) {
            toast.error("Error logging out. Try again.");
        } finally {
            setLoading(false)
        }
    };


    return (
        <>
            <div className={`dash-menu-layer ${toggleDashMenu ? '' : 'hidden'}`} onClick={onLinkClick}></div>
            <section ref={dashMenuRef} className={`dashboard-menu relative max-w-[1600px] mx-auto w-[15rem] z-5 ${toggleDashMenu ? 'toggle-dash-nav' : ''}`}>
                <div className="relative">
                    <div className="flex flex-col px-3 py-8 w-[15rem] h-screen text-white bg-purple-900 overflow-hidden fixed top-[5.3rem] max-[941px]:top-[4.4rem] left-0 min-[1600px]:left-[calc((100vw-1600px)/2)]">
                        <div className="flex gap-x-5 items-center px-2 pb-[9px] mb-5 border-b-2 border-gray-500 rounded-lg shadow-lg">
                            <img src={user.profile_image} alt="user-image" className="inline-block w-[2.5rem]"/>
                            <h5 className="leading-[1.2rem] pt-1 ml-2"><b>Hi,</b><br/>{ user ? user.full_name : 'Guest' }</h5>
                        </div>
                        <ul className="dashboard-links px-2 overflow-y-auto pb-7">
                            {
                                menuItems.map((item, index) => {
                                    if (item.label === "Logout") {
                                        return (
                                            <li key={index} className={`single-dash-link text-[1.2rem] pt-[8px] pl-[12px] cursor-pointer text-red-400 hover:text-red-500 ${loading ? '-translate-x-1 py-7' : ''}`} onClick={handleLogout}>
                                                {
                                                    loading ? <LogoutLoader /> :
                                                    <>
                                                        <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                                        {item.label}
                                                    </>
                                                }
                                            </li>
                                        );
                                    }
                        
                                    return (
                                        <li key={index} 
                                            className={`single-dash-link text-[1.5rem]
                                            ${location.pathname === item.path ? "active" : ""} 
                                            ${location.pathname.startsWith('/dashboard/item-requests') && item.path === "/dashboard/item-requests" ? "active" : ""}
                                            ${location.pathname.startsWith('/dashboard/messages') && item.path === "/dashboard/messages" ? "active" : ""}`}
                                        >
                                            <Link to={item.path} onClick={onLinkClick}>
                                                <FontAwesomeIcon icon={item.icon} className="mr-2" />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardNav
