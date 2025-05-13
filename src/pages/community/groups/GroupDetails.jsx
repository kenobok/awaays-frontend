import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams, useOutletContext} from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchGroupsConversations } from '../../../services/fetchServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import API from '/src/api/axiosInstance';
import '/src/assets/styles/community.css';


const GroupDetails = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate()
    const membersRef = useRef();
    const membersRefButton = useRef();
    const [showMembers, setShowMembers] = useState(false);
    const [currentGroup, setCurrentGroup] = useState(null);
    const [isMember, setIsMember] = useState(null);
    const [processing, setProcessing] = useState(null)
    const from = location.pathname + location.search

    const { groups, refetch, isFetching } = useOutletContext();

    const { data: conversations, isLoading, refetch: reload } = useQuery({
        queryKey: ['group-conversations', slug],
        queryFn: () => fetchGroupsConversations(slug),
        refetchInterval: 5000,
        enabled: true,
    });

    useEffect(() => {
        const cur_group = groups?.find(grp => grp.slug === slug)
        setCurrentGroup(cur_group)
    }, [groups, location.pathname])


    useEffect(() => {
        const isUserMember = currentGroup?.members?.some(member => member?.user?.id === user?.id);
        setIsMember(isUserMember);
    }, [currentGroup, user]);
    

    useEffect(() => {
        const isUserMember = JSON.parse(localStorage.getItem(`pourg-${currentGroup?.id}`))
        setIsMember(isUserMember)
    }, [location.pathname])

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

    const handleJoinGroup = async () => {
        if (user) {
            setProcessing(true)
            try {
                const res = await API.post(`/community/groups/${currentGroup.id}/join/`) 
                toast.success('You are now a member')
                setIsMember(true)
                localStorage.setItem(`puorg-${currentGroup.id}`, JSON.stringify(true));
                refetch()
            } catch(error) {
                toast.error(error?.response?.data?.detail)
            } finally {
                setProcessing(false)
            }
        } else {
            navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
        }
    }

    const handleExitGroup = async () => {
        setProcessing(true)
        try {
            const res = await API.post(`/community/groups/${currentGroup.id}/exit/`) 
            toast.warning('You are no longer a member')
            setIsMember(false)
            localStorage.removeItem(`puorg-${currentGroup.id}`);
            refetch()
        } catch(error) {
            toast.error(error?.response?.data?.detail)
        } finally {
            setProcessing(false)
        }
    } 

    const handleRemoveMember = async (memId) => {
        setProcessing(memId)
        try {
            const res = await API.post(`/community/groups/${currentGroup.id}/remove-member/`, { 'member_id': memId }) 
            toast.success('Member removed successfully')
            refetch()
        } catch(error) {
            console.log(error?.response?.data)
            toast.error(error?.response?.data?.error || 'Failed to remove member');
        } finally {
            setProcessing(null)
        }
    } 


    return (
        <div className='group-details-wrp ml-25 max-[768px]:ml-0 pr-5 max-[768px]:px-4'>
            <div className='flex mb-6'>
                <div className='relative flex-1'>
                    <h3 className='text-left my-auto text-[1.3rem] font-semibold max-[577px]:text-[1.1rem]'>{currentGroup?.name}</h3>
                    <div className='absolute'>
                        <p className='text-[.95rem] inline-block max-[577px]:block mr-10 text-orange-400'><FontAwesomeIcon icon='user-shield'/> {currentGroup?.admin.full_name}</p>
                        <p className='text-[.95rem] inline-block max-[577px]:block text-blue-500'><FontAwesomeIcon icon='users'/> {currentGroup?.members?.length}</p>
                    </div>
                </div>
                <div className='flex max-[577px]:flex-col items-center space-x-4 max-[577px]:space-x-0 mb-1 min-[768px]:space-x-0'>
                    <button ref={membersRefButton} className={`border border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white min-[651px]:hidden max-[577px]:text-[.9rem] max-[577px]:mb-2 ${showMembers ? 'border-red-400 text-red-500' : ''}`} onClick={() => setShowMembers(prev => !prev)}>Members</button>
                    { isMember ?
                        <button className='border border-red-500 text-red-500 py-[1px] px-3 rounded-full cursor-pointer max-[577px]:text-[.9rem] disabled:text-red-300 disabled:border-red-300 disabled:cursor-not-allowed' disabled={currentGroup?.admin?.id === user?.id || isFetching} onClick={() => handleExitGroup()}>
                            { processing ? <FontAwesomeIcon icon='spinner' className='animate-spin translate-y-[2px] w-[4.7rem]' /> : 'Exit Group' }
                        </button>
                        :    
                        <button className='border border-[var(--p-color)] py-[1px] px-3 rounded-full cursor-pointer hover:bg-[var(--p-color)] hover:text-white max-[577px]:text-[.9rem] disabled:text-blue-300 disabled:border-blue-300 disabled:cursor-not-allowed' disabled={isFetching} onClick={() => handleJoinGroup()}>
                            { processing ? <FontAwesomeIcon icon='spinner' className='animate-spin translate-y-[2px] w-[4.7rem]' /> : 'Join Group' }
                        </button>
                    }
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
                    {isFetching && <div className='flex justify-center my-5'><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.3rem] text-[var(--p-color)]' /></div>}
                        {
                            currentGroup?.members?.map((member, index) => (
                                <div key={index} className={`flex items-center justify-between mt-3 p-2 rounded-lg shadow`}>
                                    <div className='flex items-center'>
                                        <img src={member.user.profile_image} alt={`image`} className='w-[1.5rem] h-[1.5rem] rounded-full mr-2' />
                                        <p className='text-[.96rem] leading-[1.2rem] pt-1'>{member.user.full_name}</p>
                                    </div>
                                    { user?.id === currentGroup?.admin?.id &&
                                        member.user.id !== currentGroup?.admin?.id && 
                                        <FontAwesomeIcon icon={`${processing === member.id ? 'spinner' : 'trash-alt'}`} className={`text-red-400 text-[.9rem] hover:text-red-500 cursor-pointer ${processing === member.id ? 'animate-spin' : ''}`} onClick={() => handleRemoveMember(member.id)}/> 
                                    }
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
