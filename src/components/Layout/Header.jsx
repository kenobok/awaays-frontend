import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify';
import { HeaderLinks } from '../utils/UtilsData';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/images/logo1.png';
import '../../assets/styles/header-footer.css'


const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 940px)" });
    const navigate = useNavigate();
    const location = useLocation();
    const searchInputRef = useRef(null);
    const menuIconRef = useRef(null);
    const menuRef = useRef(null);
    const dropDownRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {user, fetchUser} = useAuth();


    useEffect(() => {
        fetchUser()
    }, [location.pathname])

    useEffect(() => {
        console.log(user)
    }, [location.pathname])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                if (!isSticky) {
                    setIsSticky(true);
                }
            } else {
                if (isSticky) {
                    setIsSticky(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSticky]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            searchInputRef.current.value = "";
        }
    }, [searchQuery]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => {
        setSearchQuery("");
        setIsFocused(false);
    }

    const handleIconClick = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleMenuToggle = () => {
        setIsOpen(prevState => !prevState);
        setShowMenu(prevState => !prevState);
        setBlurBackground(prevState => !prevState)
    };

    const handleClickOutside = (e) => {
        if (menuIconRef.current && !menuIconRef.current.contains(e.target) && menuRef.current && !menuRef.current.contains(e.target)) {
            setIsOpen(false);
            setShowMenu(false);
            setBlurBackground(false);
        }
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
            setIsDropdownOpen(false)
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/giveaway-items?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <header>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className={`blur-bg ${blurBackground ? 'bluring' : ''}`}></div>
            <nav className={`navbar flex align-center justify-between gap-x-5 p-3 px-[20px] md:px-[50px] ${isSticky ? 'sticky' : ''}`}>
                <Link to="/" className={`my-auto`}>
                    <img src={logo} loading="lazy" alt="Awaays"/>
                </Link>
                <div className={`flex-1 ${isFocused ? 'max-[577px]:hidden' : ''}`}></div>
                <div className="block min-[941px]:flex gap-x-5 align-center justify-end">
                    <div ref={menuRef} className={`nav-links fixed min-[941px]:relative min-[941px]:flex my-auto text-[.95rem] ${isFocused ? 'min-[941px]:text-[.45rem]' : ''} ${isFocused ? 'min-[993px]:text-[.6rem]' : ''} ${showMenu ? 'show-menu' : ''} z-[5]`}>
                        {
                            HeaderLinks.map((link, index) => {
                                if(link.name === "Community") {
                                    return (
                                        <div key={index} ref={dropDownRef} className="relative">
                                            <button className={`${isDropdownOpen ? "active" : ""}`} onClick={toggleDropdown}>{ link.name }<b className={`${isDropdownOpen ? 'arrow-up' : ''}`}>{`>`}</b></button>
                                            {isDropdownOpen && (
                                                <motion.div className="dropdown-links mt-1 p-5 absolute max-[941px]:top-[2.9rem] left-[50%] transform -translate-x-[50%] w-[12rem] max-[941px]:w-full bg-[var(--bg-color)] max-[941px]:bg-indigo-100 shadow-xl rounded-2xl z-5" initial={{y: 100, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{duration: .5, ease: "easeInOut"}}>
                                                    { link.dropdown.map((item, index) => (
                                                        <Link key={index} to={ item.goto } className="inline-block px-4 py-2" onClick={() => {if (isMobile) handleMenuToggle(); toggleDropdown();}}>{ item.name }</Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    )
                                }
                                if(link.name === "Join") {
                                    return (
                                        <Link key={index} to={user ? "/dashboard" : link.goto} className={location.pathname === (user ? "/dashboard" : link.goto) ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>{ user ? 'Account' : link.name }</Link>
                                    )
                                }
                                return (
                                    <Link key={index} to={link.goto} className={location.pathname === link.goto ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>{ link.name }</Link>
                                )
                            })
                        }
                    </div>
                    <form onSubmit={handleSearch} className="relative flex align-center py-[13px] peer">
                        <input name="search" type="search" placeholder="Search..." className={`${searchQuery ? 'search-active' : ''}`} value={searchQuery} onFocus={handleFocus} onBlur={handleBlur} ref={searchInputRef} onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className={`text-[#aaa] absolute top-[50%] transform-[translateY(-50%)] right-[15px] ${isFocused ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon="search" onClick={handleIconClick} />
                        </span>
                    </form>
                </div>
                <div onClick={handleMenuToggle} ref={menuIconRef} className={`relative w-[30px] h-[25px] my-auto cursor-pointer overflow-hidden min-[941px]:hidden z-[5] ${isFocused ? 'hide-menu-bar' : ''}`}>
                    <div className={`h-[3px] w-[90%] absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-[11px] bg-[#777]' : 'top-0 right-0 bg-[#777]'}`}></div>
                    <div className={`h-[3px] w-[85%] absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 top-0 bg-[#777]': 'opacity-100 top-[11px] bg-[#777]'}`}></div>
                    <div className={`h-[3px] w-[90%] absolute transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-[11px] bg-[#777]' : 'bottom-0 right-0 bg-[#777]'}`}></div>
                </div>
            </nav>
        </header>
    )
}


export default Header;
