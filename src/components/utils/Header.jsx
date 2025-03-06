import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';


const Header = () => {
    const [isFocused, setIsFocused] = useState(false);
    const searchInputRef = useRef(null);
    const menuIconRef = useRef(null);
    const menuRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [blurBackground, setBlurBackground] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (blurBackground) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [blurBackground]);

    return (
        <header>
            <div className={`blur-bg ${blurBackground ? 'active' : ''}`} style={{zIndex: blurBackground ? '999' : '-9', opacity: blurBackground ? 1 : 0, transition: 'all 0.3s ease-in-out'}}></div>
            <div className={`navbar flex align-center justify-between gap-x-5 p-2 pt-4 px-[20px] md:px-[50px] z-[999] ${isSticky ? 'sticky' : ''}`}>
                <Link to="/" className="flex-1">
                    <img src={logo} loading="lazy" alt="Awaays"/>
                </Link>
                <div className="my-auto block min-[767px]:flex gap-x-5 align-center justify-end">
                    <div ref={menuRef} className={`nav-links fixed min-[767px]:relative min-[767px]:flex my-auto gap-x-5 min-[992px]:gap-x-8 text-[14px] ${isFocused ? 'min-[767px]:text-[7px]' : ''} ${isFocused ? 'min-[992px]:text-[10px]' : ''} ${showMenu ? 'show-menu' : ''}`}>
                        <div><Link to="">Shop</Link></div>
                        <div><Link to="">Swap</Link></div>
                        <div><Link to="">Giveaway</Link></div>
                        <div><Link to="">Contact</Link></div>
                        <div><Link to="">Sign Up | Sign In</Link></div>
                    </div>
                    <form className="relative peer">
                        <input name="search" type="search" placeholder="Search..." onFocus={handleFocus} onBlur={handleBlur} ref={searchInputRef} />
                        <span className={`text-[#999] absolute top-[50%] transform-[translateY(-50%)] right-[15px] ${isFocused ? 'hidden' : ''}`}>
                            <FontAwesomeIcon icon="search" onClick={handleIconClick} />
                        </span>
                    </form>
                </div>
                <div onClick={handleMenuToggle} ref={menuIconRef} className={`relative w-[30px] h-[25px] my-auto cursor-pointer overflow-hidden transition-all duration-300 min-[767px]:hidden z-[999]`} aria-label="Toggle menu">
                    <div className={`h-[3px] w-[90%] bg-[#888] absolute transition-all duration-300 ${isOpen ? 'rotate-45 top-[11px]' : 'top-0 right-0'}`}></div>
                    <div className={`h-[3px] w-[85%] bg-[#888] absolute transition-all duration-300 ${isOpen ? 'opacity-0 top-0': 'opacity-100 top-[11px]'}`}></div>
                    <div className={`h-[3px] w-[90%] bg-[#888] absolute transition-all duration-300 ${isOpen ? '-rotate-45 top-[11px]' : 'bottom-0 right-0'}`}></div>
                </div>
            </div>
        </header>
    )
}


export default Header;
