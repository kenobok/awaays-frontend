import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faTwitter, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import logo from '../../assets/images/logo.png'


export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true); 
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', 
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer>
            <div className="relative p-10 py-30 lg:p-50 lg:pl-30 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/" className="block text-left mb-8">
                    <img loading="lazy" src={logo} alt="logo" className="w-[150px] mx-auto"/>
                </Link>

                <div className="text-center w-[100%]">
                    <Link to="">Orders</Link>
                    <Link to="">Wishlist</Link>
                    <Link to="">Track Order</Link>
                    <Link to="">Manage Account</Link>
                    <Link to="">Return Order</Link>
                </div>

                <div className="text-center w-[100%]">
                    <Link to="">About Us</Link>
                    <Link to="">Return Policy</Link>
                    <Link to="">Terms & condition</Link>
                    <Link to="">Privacy Policy</Link>
                    <Link to="">FAQ</Link>
                </div>

                <div className="text-center mx-auto w-[100%]">
                    <div className="flex justify-around align-center mb-[30px]" style={{fontSize:'24px'}}>
                        <FontAwesomeIcon icon="fab fa-instagram" className='text-red-600 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-facebook" className='text-blue-600 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-twitter" className='text-blue-500 cursor-pointer' />
                        <FontAwesomeIcon icon="fab fa-threads" className='cursor-pointer'/>
                    </div>

                    <div className="text-center ">
                        <h4>Newsletter</h4>
                        <form className="" >
                            <input type="email" placeholder="Your email address" className='border-2 border-white focus:outline-none rounded-md p-2 mb-4 w-[100%] block'/>
                            <button type="submit" className="p-1 px-3 text-white rounded-lg shadow-md cursor-pointer text-sm" style={{background:'var(--p-color)'}}>Subscribe</button>
                        </form>
                    </div>
                </div>


                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-sm text-center w-[100%]">
                    <p>© Awaays 2025 - All Rights Reserved</p>
                </div>

                <button onClick={scrollToTop} className="back-to-top fixed bottom-10 right-10 bg-primary p-4 rounded-full shadow-md text-white">
                    <FontAwesomeIcon icon="arrow-up" />
                </button>
            </div>
        </footer>
    )
}