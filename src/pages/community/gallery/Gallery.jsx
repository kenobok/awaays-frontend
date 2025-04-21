import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { galleries } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css'

const GalleryImages = () => {
    const location = useLocation();

    return (
        <main className='space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10'>
            <section className='w-[10rem] max-[768px]:w-[80%]'>
                <div className='px-5 min-[768px]:fixed max-[768px]:mb-10 h-[90vh] max-[768px]:h-[15rem] overflow-y-auto pb-10 max-[768px]:pb-0'>
                    <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)]'>
                        { galleries.map((gallery, index) => (
                            <li key={index} className={`lb-link border-b border-gray-300 hover:text-[var(--p-color)] hover:border-[var(--p-color)] ${location.pathname.includes(gallery.slug) ? 'active show-icon' : ''}`}><Link to={gallery.slug}>{gallery.name}</Link></li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className='flex-1 overflow-hidden'><Outlet /></section>
        </main>
    )
}

export default GalleryImages

