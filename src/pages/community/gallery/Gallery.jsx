import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { galleryLinks } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css'

const Gallery = () => {
    const location = useLocation();


    return (
        <main className='space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10'>
            <section className='w-[10rem] max-[768px]:w-[80%]'>
                <div className='px-5 min-[768px]:fixed max-[768px]:mb-10'>
                    <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)]'>
                        { galleryLinks.map((link, index) => (
                            <li key={index} className={`lb-link border-b border-gray-300 hover:text-[var(--p-color)] hover:border-[var(--p-color)] ${location.pathname === link.link ? 'active show-icon' : ''}`}><Link to={link.link}>{link.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className='flex-1 overflow-hidden'><Outlet /></section>
        </main>
    )
}

export default Gallery

