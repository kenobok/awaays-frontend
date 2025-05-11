import { useState, useEffect } from 'react';
import API from '../../api/axiosInstance';
import { useAuth } from '../../context/AuthContext'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchConversations } from '../../services/fetchServices';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader1 } from '../../components/utils/Preloader';

const Messages = () => {
    const location = useLocation();
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const [isMessageList, setIsMessageList] = useState(true);
    const [unRead, setUnRead] = useState(null)

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['fetch-conversations'],
        queryFn: fetchConversations,
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
        enabled: true,
    });

    useEffect(() => {
        setIsMessageList(location.pathname === '/dashboard/messages' || location.pathname === '/dashboard/messages/')
    }, [location.pathname])

    useEffect(() => {
        if (!Array.isArray(data)) return;

        const unreadConversations = data.filter(convo =>
            Array.isArray(convo.messages) && convo.messages.some(msg => msg.read === false)
        );

        setUnRead(unreadConversations.map(conv => conv.slug)); 
    }, [data]);



    const handleOpened = async (slug) => {
        try {
            queryClient.setQueryData(['fetch-conversations'], (oldData) => {
                if (!oldData) return [];
                return oldData.map(conv =>
                    conv.slug === slug
                        ? {
                            ...conv,
                            opened: true,
                            messages: conv.messages?.map(msg =>
                                msg.receiver === user.id ? { ...msg, read: true } : msg
                            )
                        }
                        : conv
                );
            });
            await API.post(`/account/conversations/${slug}/mark-read/`);
        } catch (err) {
            queryClient.invalidateQueries(['fetch-conversations']);
        }
    };



    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-5 max-[941px]:px-5 max-[651px]:px-0`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100'>Messages</h2>
            <div className='flex justify-evenly flex-wrap gap-5'>
                <div className={`message-list relative min-[651px]:border border-gray-300 rounded-xl p-4 py-3 min-[651px]:shadow-lg w-[18rem] max-[651px]:flex-1 max-[768px]:w-[15rem] min-[651px]:h-[78vh] overflow-x-hidden overflow-y-auto ${isMessageList ? '' : 'hide-list'}`}>
                    {/* <FontAwesomeIcon onClick={() => handleRefresh()} icon='fa-refresh' className={`absolute top-2 right-2 cursor-pointer hover:text-[var(--p-color)] ${isFetching ? 'animate-spin text-[var(--p-color)]' : ''}`} /> */}
                    {isLoading ? <div className='h-[100%]'><Loader1 /></div> :
                        <ul className={`space-y-3 min-[651px]:mt-4`}>
                            {data.length > 0 ? data.map((conv, index) => {
                                let last_message = conv?.last_message;
                                if (!last_message) { last_message = '' };

                                const otherUserName = conv.participant_1_id === user.id ? conv.participant_2_name : conv.participant_1_name;
                                const otherUserImage = conv.participant_1_id === user.id ? conv.participant_2_image : conv.participant_1_image;

                                return (
                                    <li key={index}>
                                        <Link
                                            to={`/dashboard/messages/${conv.slug}`}
                                            onClick={() => { handleOpened(conv.slug) }}
                                            className={`relative space-y-2 flex gap-x-3 p-[8px] items-center leading-[1.1rem] rounded-lg shadow cursor-pointer ${location.pathname.includes(conv.slug) ? 'bg-blue-500 text-white' : ''}`}
                                        >
                                            <img src={otherUserImage} alt='user' className='w-[2.8rem] h-[2.8rem] max-[768px]:w-[2rem] max-[768px]:h-[2rem] m-0 rounded-full' />
                                            <div className='overflow-hidden m-0 py-1'>
                                                <h5 className='font-semibold text-[.95rem] pt-[5px] truncate'>{otherUserName}</h5>
                                                <p className='text-[.85rem] mt-[2px] truncate'>{last_message.message}</p>
                                            </div>
                                            {last_message.sender !== user.id && unRead?.includes(conv.slug) && (
                                                <FontAwesomeIcon icon='circle' className='absolute top-[5px] right-[5px] text-[.5rem] text-orange-400'/>
                                            )}
                                        </Link>
                                    </li>
                                );
                            }) : (
                                <p className='text-center'>No Message(s)</p>
                            )
                            }
                        </ul>
                    }
                </div>
                <div className={`message-outlet relative flex-1 min-[651px]:border border-gray-300 rounded-xl p-4 py-0 pb-2 min-[651px]:shadow-lg flex justify-center items-center ${isMessageList ? '' : 'hide-outlet'}`}><h5 className=''>Select a chat</h5></div>
                <div className={`message-outlet relative flex-1 min-[651px]:border border-gray-300 rounded-xl p-4 py-0 pb-2 min-[651px]:shadow-lg ${isMessageList ? 'hide-outlet' : 'small-outlet'}`}>
                    <Outlet />
                </div>
            </div>
        </motion.section>
    )
}

export default Messages

