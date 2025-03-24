import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo1.png'
import '../../assets/styles/header-footer.css'


export default function Footer() {
    const [bactToTop, setBactToTop] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 1000) {
            setBactToTop(true); 
        } else {
            setBactToTop(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
        setBactToTop(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer className="mt-[15rem]">
            <div className="relative px-[8rem] max-[768px]:px-[4rem] pt-[12rem] max-[768px]:pt-[8rem] pb-[8rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Link to="/" className="block mb-5">
                    <img loading="lazy" src={logo} alt="logo" className="w-[12rem] max-[768px]:w-[10rem] mx-auto"/>
                </Link>

                <div className="text-center w-[100%] mb-5">
                    <Link to="">Orders</Link>
                    <Link to="">Wishlist</Link>
                    <Link to="">Track Order</Link>
                    <Link to="">Manage Account</Link>
                    <Link to="">Return Order</Link>
                </div>

                <div className="text-center w-[100%] mb-5">
                    <Link to="/about-us">About Us</Link>
                    <Link to="/contact-us">Contact Us</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <Link to="/terms-and-conditions">Terms & condition</Link>
                    <Link to="/FAQs">FAQs</Link>
                </div>

                <div className="text-center w-[100%] mb-5">
                    <div className="flex justify-around align-center mb-[30px]" style={{fontSize:'24px'}}>
                        <FontAwesomeIcon icon="fab fa-instagram" className='text-red-600 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-facebook" className='text-blue-600 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-twitter" className='text-blue-500 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-threads" className='cursor-pointer text-gray-300'/>
                    </div>

                    <div>
                        <h4 style={{ color:'#fff' }}>Newsletter</h4>
                        <form className="mx-auto" >
                            <input type="email" placeholder="Your email address" className='border-2 border-white focus:outline-none rounded-md p-2 mb-4 w-[100%] block text-white'/>
                            <button type="submit" className="p-1 px-3 text-[#444] bg-gray-200 rounded-lg shadow-sm cursor-pointer text-sm">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm text-center w-[100%]">
                    <p>© Awaays 2025 - All Rights Reserved</p>
                </div>

                <button onClick={scrollToTop} className={`back-to-top fixed bottom-10 right-10 bg-primary p-4 rounded-full shadow-md text-white z-[1] ${!bactToTop ? 'hidden text-[16px] color-[#7730fc80]' : ''}`}>
                    <FontAwesomeIcon icon="arrow-up" />
                </button>
            </div>
        </footer>
    )
}


