import { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import group_img from '/src/assets/images/group.png';
import { Loader1 } from '../../../components/utils/Preloader';
import '/src/assets/styles/community.css';

const GroupsList = () => {
    const { groups, isLoading, isError, refetch, isFetching } = useOutletContext();

    useEffect(() => {
        const handleFocus = () => {
            refetch();
        };
        window.addEventListener('focus', handleFocus);
        return () => {
            window.removeEventListener('focus', handleFocus);
        };
    }, []);

    return (
        <div className='ml-25 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.3rem] font-semibold border-b border-gray-200'>Groups</h3>
            <div className='py-10'>
                {isLoading ? <div className='h-[20vh]'><Loader1 /></div> :
                    <>
                        {isFetching && <div className='flex justify-center mb-5'><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.3rem] text-[var(--p-color)]' /></div>}
                        <motion.div className='grid grid-cols-4 max-[1201px]:grid-cols-3 max-[941px]:grid-cols-2 max-[768px]:grid-cols-2 gap-7 max-[941px]:gap-x-5 mx-auto  px-5' initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
                            {
                                groups?.map((group, index) => (
                                    <Link to={group.slug} key={index} className={`flex flex-col relative pb-2 shadow-lg rounded-xl hover:scale-105 transition-all duration-100 ease-in-out hover:text-[var(--p-color)]`}>
                                        <img src={group.image_url || group_img} alt={`${group.name} image`} className='w-full h-[10rem] max-[577px]:h-[10rem] object-cover mb-3 rounded-xl' />
                                        <div className='px-1 align-items-end'>
                                            <h4 className='font-bold text-[1rem] leading-[1.1rem] text-center mb-[2px] line-clamp-1'>{group.name}</h4>
                                            <p className='text-center text-[.95rem] leading-[1rem] line-clamp-2 h-[2.5rem] max-[768px]:h-[1.97rem]'>{group.description}</p>
                                            <div className='flex justify-between px-2 mt-1'>
                                                <div className='flex-none text-blue-600 text-[1rem] max-[768px]:text-[0.9rem] mr-5'><FontAwesomeIcon icon='users' /> {group.members.length}</div>
                                                <p className='font-semibold text-[1rem] max-[768px]:text-[0.9rem] text-orange-400 truncate'><FontAwesomeIcon icon='user-shield' /> {group.admin.full_name}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </motion.div>
                    </>
                }
            </div>
        </div>
    )
}

export default GroupsList

