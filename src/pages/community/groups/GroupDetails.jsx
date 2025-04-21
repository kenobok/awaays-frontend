import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { groups } from '/src/components/utils/UtilsData';
import '/src/assets/styles/community.css';
import userImg from '/src/assets/images/hero2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GroupDetails = () => {
    const { slug } = useParams();
    const membersRef = useRef();
    const [showMembers, setShowMembers] = useState(false);


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (e) => {
        if (membersRef.current && !membersRef.current.contains(e.target)) {
            setShowMembers(false);
        }
    };


    const group = useMemo(() => {
        return groups.find(g => slug === g.slug);
    }, [slug, groups])

    return (
        <div className='group-details-wrp ml-25 max-[768px]:ml-0 pr-5 max-[768px]:px-4'>
            <div className='flex mb-6'>
                <div className='relative flex-1'>
                    <h3 className='text-left my-auto text-[1.3rem] font-semibold max-[577px]:text-[1.1rem]'>{group.name}</h3>
                    <div className='absolute'>
                        <p className='text-[.95rem] inline-block max-[577px]:block mr-10 text-orange-400'><FontAwesomeIcon icon='user-shield'/> {group.admin}</p>
                        <p className='text-[.95rem] inline-block max-[577px]:block text-blue-500'><FontAwesomeIcon icon='users'/> {group.members.length}</p>
                    </div>
                </div>
                <div className='flex max-[577px]:flex-col items-center space-x-4 max-[577px]:space-x-0 mb-1 min-[768px]:space-x-0'>
                    <button className={`border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white min-[768px]:hidden max-[577px]:text-[.9rem] max-[577px]:mb-2 ${showMembers ? 'border-red-400 text-red-500' : ''}`} onClick={() => {setShowMembers(!showMembers)}}>Members</button>
                    <button className='border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white max-[577px]:text-[.9rem]'>Join Group</button>
                </div>
            </div>
            <div className='flex justify-between gap-x-5 h-[75vh] overflow-y-auto'>
                <div className={`flex-1 border border-gray-300 rounded-xl`}>

                </div>
                                                                                                                                                                                                                                                                                                                                                                               
                <div ref={membersRef} className={`members-wrp w-[18rem] max-[1080px]:w-[17rem] h-full bg-blue-200 pt-2 px-3 rounded-xl ${showMembers ? 'show' : ''}`}>
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
