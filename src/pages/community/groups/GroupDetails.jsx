import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams , useOutletContext} from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupsConversations } from '../../../services/fetchServices';
import '/src/assets/styles/community.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const GroupDetails = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const membersRef = useRef();
    const membersRefButton = useRef();
    const [showMembers, setShowMembers] = useState(false);

    const { data: conversations, isLoading, refetch } = useQuery({
        queryKey: ['group-conversations', slug],
        queryFn: () => fetchGroupsConversations(slug),
        refetchInterval: 5000,
        enabled: true,
    });

    useEffect(() => {
        console.log(conversations)
    }, [conversations])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickOutside = (e) => {
        if (membersRef.current && !membersRef.current.contains(e.target) && membersRefButton.current && !membersRefButton.current.contains(e.target)) {
            setShowMembers(false);
        }
    };


    return (
        <div className='group-details-wrp ml-25 max-[768px]:ml-0 pr-5 max-[768px]:px-4'>
            <div className='flex mb-6'>
                <div className='relative flex-1'>
                    <h3 className='text-left my-auto text-[1.3rem] font-semibold max-[577px]:text-[1.1rem]'>{conversations?.group?.name}</h3>
                    <div className='absolute'>
                        <p className='text-[.95rem] inline-block max-[577px]:block mr-10 text-orange-400'><FontAwesomeIcon icon='user-shield'/> {conversations?.group?.admin}</p>
                        <p className='text-[.95rem] inline-block max-[577px]:block text-blue-500'><FontAwesomeIcon icon='users'/> {conversations?.group?.members.length}</p>
                    </div>
                </div>
                <div className='flex max-[577px]:flex-col items-center space-x-4 max-[577px]:space-x-0 mb-1 min-[768px]:space-x-0'>
                    <button ref={membersRefButton} className={`border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white min-[651px]:hidden max-[577px]:text-[.9rem] max-[577px]:mb-2 ${showMembers ? 'border-red-400 text-red-500' : ''}`} onClick={() => setShowMembers(prev => !prev)}>Members</button>
                    <button className='border-2 border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white max-[577px]:text-[.9rem]'>Join Group</button>
                </div>
            </div>
            <div className='flex justify-between gap-x-5 h-[75vh] max-[651px]:h-[calc(100vh-13rem)] overflow-y-hidden'>
                <div className={`flex-1 min-[651px]:border border-gray-300 rounded-xl`}>
                    <div className={`w-full h-full rounded-xl px-3 max-[651px]:px-0 ${showMembers ? 'hidden' : ''}`}>
                        <div className='w-full h-[64vh] overflow-y-scroll'>
                            { 
                                conversations?.length > 0 ? conversations?.map((conv, index) => (
                                    <div key={index} className={`flex relative ${conv.user === user ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`relative p-[10px] pb-[5px] mt-3 max-w-[70%] max-[1081px]:max-w-[80%] rounded-lg ${conv.user === user ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                            <h5 className='text-[1rem] leading-[1rem] mb-1 font-semibold'>{conv.user}</h5>
                                            <p className='text-[.93rem] leading-[1rem] mb-1'>{conv.message}</p>
                                            <address className='text-black text-[.66rem]'>12:56 PM || 21/04/2025</address>
                                        </div>
                                    </div>
                                )) 
                                :
                                <div className='text-center'>
                                    <h4 className='text-[1.2rem] font-semibold mt-20'>No conversations available</h4>
                                    <p>Enter a message below.</p>
                                </div>
                            }
                        </div>
                        
                        <div className='w-full h-18 mt-2 bg-white'>
                            <form className='h-full flex'>
                                <textarea className='border border-gray-300 h-full w-full resize-none leading-[1.1rem] p-2 px-3 rounded-lg text-[.93rem] focus:outline-[var(--p-color)]' placeholder='Enter your message'></textarea>
                                <button className='text-white text-[1.5rem] bg-[var(--p-color)] leading-[1.2rem] rounded-lg cursor-pointer px-2'><FontAwesomeIcon icon='paper-plane' /></button>
                            </form>
                        </div>
                    </div>
                </div>

                <div ref={membersRef} className={`members-wrp w-[18rem] max-[1080px]:w-[17rem] h-full bg-blue-200 pt-2 px-3 rounded-xl ${showMembers ? 'show' : 'hide'}`}>
                    <h4 className='text-center font-semibold'>Members</h4>
                    <div className={`w-full h-[70vh] overflow-y-auto`}>
                        {
                            conversations?.members?.map((member, index) => (
                                <div key={index} className={`flex items-center justify-between mt-3 p-2 rounded-lg shadow`}>
                                    <div className='flex items-center'>
                                        <img src={member.profile_image} alt={`image`} className='w-[1.5rem] h-[1.5rem] rounded-full mr-2' />
                                        <p className='text-[.96rem] leading-[1.2rem] pt-1'>{member.full_name}</p>
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
