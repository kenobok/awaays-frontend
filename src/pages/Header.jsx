import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png';


const Header = () => {
    return (
        <header>
            <div className="flex align-center justify-end gap-5 p-2 pr-5 text-[11px] sm:text-[12px] md:text-[13px]" >
                <Link to="">Sell on Awaays</Link>
                <Link to="">Giveaway</Link>
                <Link to="">Customer care</Link>
            </div>
            <div className="navbar flex align-center justify-between p-2 px-[20px] md:px-[50px] shadow-sm">
                <Link to="/" className="">
                    <img src={logo} loading="lazy" alt="Awaays"/>
                </Link>
                <div className="my-auto">
                    <form action="#" className="relative">
                        <input name="search" type="search" placeholder="Search..." className='peer'/>
                        <button className="text-zinc-400 absolute top-[15%] right-[15px] peer-focus:hidden">
                            <FontAwesomeIcon icon="search"/>
                        </button>
                    </form>
                </div>
            </div>
        </header>
    )
}


export default Header;
