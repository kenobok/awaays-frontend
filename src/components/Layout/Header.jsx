import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import logo from '../../assets/images/logo1.png';
import '../../assets/styles/header-footer.css'


const Header = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 940px)" });
    const location = useLocation();
    const searchInputRef = useRef(null);
    const menuIconRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate()
    const [isFocused, setIsFocused] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");


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
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/giveaway-items?search=${encodeURIComponent(searchQuery)}`);
        }
    };


    return (
        <header>
            <div className={`blur-bg ${blurBackground ? 'bluring' : ''}`}></div>
            <nav className={`navbar flex align-center justify-between gap-x-5 p-3 px-[20px] md:px-[50px] ${isSticky ? 'sticky' : ''}`}>
                <Link to="/" className={`my-auto`}>
                    <img src={logo} loading="lazy" alt="Awaays"/>
                </Link>
                <div className="flex-1"></div>
                <div className="block min-[941px]:flex gap-x-5 align-center justify-end">
                    <div ref={menuRef} className={`nav-links fixed min-[941px]:relative min-[941px]:flex my-auto text-[1rem] ${isFocused ? 'min-[941px]:text-[.5rem]' : ''} ${isFocused ? 'min-[992px]:text-[.7rem]' : ''} ${showMenu ? 'show-menu' : ''} z-[5]`}>
                        <Link to="/give-item" className={location.pathname === "/give-item" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>Give Item</Link>
                        <Link to="/giveaway-items" className={location.pathname === "/giveaway-items" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>Giveaways</Link>
                        <Link to="" className={location.pathname === "/community" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>Community</Link>
                        <Link to="/how-it-works" className={location.pathname === "/how-it-works" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>How It Works</Link>
                        <Link to="/FAQs" className={location.pathname === "/FAQs" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>FAQs</Link>
                        <Link to="/auth" className={location.pathname === "/auth" ? "active" : ""} onClick={isMobile ? handleMenuToggle : undefined}>Join</Link>
                    </div>
                    <form onSubmit={handleSearch} className="relative flex align-center py-[13px] peer">
                        <input name="search" type="search" placeholder="Search..." className={`${searchQuery ? 'search-active' : ''}`} value={searchQuery} onFocus={handleFocus} onBlur={handleBlur} ref={searchInputRef} onChange={(e) => setSearchQuery(e.target.value)} />
                        <span className={`text-[#aaa] absolute top-[50%] transform-[translateY(-50%)] right-[15px] ${isFocused ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon="search" onClick={handleIconClick} />
                        </span>
                    </form>
                </div>
                <div onClick={handleMenuToggle} ref={menuIconRef} className={`relative w-[30px] h-[25px] my-auto cursor-pointer overflow-hidden transition-all duration-300 min-[941px]:hidden z-[5] ${isFocused ? 'hide-menu-bar' : ''}`}>
                    <div className={`h-[3px] w-[90%] absolute transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 top-[11px] bg-[#777]' : 'top-0 right-0 bg-[#777]'}`}></div>
                    <div className={`h-[3px] w-[85%] absolute transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 top-0 bg-[#777]': 'opacity-100 top-[11px] bg-[#777]'}`}></div>
                    <div className={`h-[3px] w-[90%] absolute transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 top-[11px] bg-[#777]' : 'bottom-0 right-0 bg-[#777]'}`}></div>
                </div>
            </nav>
        </header>
    )
}


export default Header;
