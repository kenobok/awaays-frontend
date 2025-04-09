import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import '/src/assets/styles/community.css'

const Gallery = () => {
    const location = useLocation();

    const links = [
        {
            link: '/community/gallery',
            name: 'General Giveaway'
        },
        {
            link: '/community/gallery/healthcare-support',
            name: 'Healthcare Support'
        },
        {
            link: '/community/gallery/prison-outreach',
            name: 'Prison Outreach'
        },
        {
            link: '/community/gallery/homeless-shelter',
            name: 'Homeless Shelter'
        },
        {
            link: '/community/gallery/education-support',
            name: 'Education Support'
        },
        {
            link: '/community/gallery/orphanage-support',
            name: 'Orphanage Support'
        },
        {
            link: '/community/gallery/disaster-relief',
            name: 'Disaster Relief'
        },
        {
            link: '/community/gallery/disability-support',
            name: 'Disability Support'
        }
    ]

    return (
        <main className='space-x-10 flex max-[768px]:flex-col mt-[5.5rem] max-[941px]:mt-[4rem] py-10'>
            <section className='w-[10rem] max-[768px]:w-[80%]'>
                <div className='px-5 min-[768px]:fixed max-[768px]:mb-10'>
                    <ul className='com-side-link relative space-y-5 p-7 text-center border-r-2 border-[var(--p-color)]'>
                        { links.map((link, index) => (
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

