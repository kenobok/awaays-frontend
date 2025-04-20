import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { groups } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css';
import userImg from '/src/assets/images/hero2.png'


const GroupDetails = () => {
    const { slug } = useParams();

    const group = useMemo(() => {
        return groups.find(g => slug === g.slug);
    }, [slug, groups])

    return (
        <div className='group-details-wrp ml-25 max-[768px]:ml-0 pr-5 max-[768px]:px-4'>
            <div className='flex justify-between mb-5 border-b border-gray-200'>
                <h3 className='text-center text-[1.3rem] font-semibold'>{group.name}</h3>
                <div className='space-x-5 mb-1 min-[768px]:space-x-0'>
                    <button className='border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white min-[768px]:hidden'>Members</button>
                    <button className='border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white'>Join Group</button>
                </div>
            </div>
            <div className='flex justify-between gap-x-7 h-[75vh] overflow-y-auto'>
                <div className={`flex-1 bg-green-400`}></div>
                
                <div className={`w-[18rem] max-[1080px]:w-[17rem] h-full bg-blue-200 pt-2 px-3 max-[768px]:hidden`}>
                    <h4 className='text-center font-semibold'>Members</h4>
                    <div className={`w-full h-[70vh] overflow-y-auto`}>
                        {
                            group.members.map((member, index) => (
                                <div key={index} className={`flex items-center justify-between mt-3 p-2 rounded-lg shadow`}>
                                    <div className='flex items-center'>
                                        <img src={userImg} alt={`image`} className='w-[1.5rem] h-[1.5rem] rounded-full mr-2' />
                                        <p className='text-[.96rem] leading-[1.2rem] pt-1'>{member}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupDetails;
