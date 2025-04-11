import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forumLinks } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css';

const ForumList = () => {

    return (
        <div className='ml-25 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.3rem] font-semibold border-b border-gray-200'>Forums</h3>
            <div className='py-10'>
                <motion.div className='grid grid-cols-3 max-[577px]:grid-cols-2 gap-7 max-[941px]:gap-x-5 mx-auto max-w-4xl max-[768px]:px-5' initial={{y: 200, opacity: 0}} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
                    {
                        forumLinks.map((forum, index) => (
                            <Link to={forum.link} key={index} className={`relative pb-4 shadow-lg rounded-xl hover:scale-105 transition-all duration-100 ease-in-out hover:text-[var(--p-color)]`}>
                                <img src={forum.image} alt={`${forum.name} image`} className='w-full h-[12rem] object-cover mb-5 rounded-xl' />
                                <h4 className='font-semibold text-[1rem] leading-[1.2rem] text-center'>{forum.name}</h4>
                            </Link>
                        ))
                    }
                </motion.div>
            </div>
        </div>
    )
}

export default ForumList
