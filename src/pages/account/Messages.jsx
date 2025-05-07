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

    const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
        queryKey: ['fetch-conversations'],
        queryFn: fetchConversations,
    });

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        setIsMessageList(location.pathname === '/dashboard/messages' || location.pathname === '/dashboard/messages/')
    }, [location.pathname])

    const handleOpened = async (id) => {
        try {
            queryClient.setQueryData(['fetch-conversations'], (oldData) => {
                if (!oldData) return [];
                return oldData.map(conv =>
                    conv.id === id ? { ...conv, opened: true } : conv
                );
            });
    
            await API.patch(`/account/conversations/${id}/`, { opened: true });
        } catch (err) {
            console.error("Failed to mark conversation as opened:", err);
    
            queryClient.invalidateQueries(['fetch-conversations']);
        }
    };

    const handleRefresh = async () => {
        refetch()
    }


    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100'>Messages</h2>
            <div className='flex justify-evenly flex-wrap gap-5'>
                <div className={`message-list relative border border-gray-300 rounded-xl p-4 py-3 shadow-lg w-[18rem] max-[651px]:flex-1 max-[768px]:w-[15rem] h-[72vh] overflow-x-hidden overflow-y-auto ${isMessageList ? '' : 'hide-list'}`}>
                    <FontAwesomeIcon onClick={() => handleRefresh()} icon='fa-refresh' className={`absolute top-2 right-2 cursor-pointer hover:text-[var(--p-color)] ${isFetching ? 'animate-spin text-[var(--p-color)]' : ''}`} />
                    { isLoading ? <div className='h-[100%]'><Loader1 /></div> :
                        <ul className={`space-y-3 mt-4`}>
                                {data.length > 0 ? data.map((conv, index) => {
                                    const last_message = conv.last_message;
                                    if (!last_message) return null;

                                    const otherUserName = conv.participant_1_id === user.id 
                                        ? conv.participant_2_name 
                                        : conv.participant_1_name;

                                    return (
                                        <li key={index}>
                                            <Link 
                                                to={`/dashboard/messages/${conv.slug}`}
                                                onClick={() => handleOpened(conv.id)}
                                                className={`relative space-y-2 flex gap-x-3 p-[8px] items-center leading-[1.1rem] rounded-lg shadow cursor-pointer ${location.pathname.includes(conv.slug) ? 'bg-blue-500 text-white' : ''}`}
                                            >
                                                <img 
                                                    src={last_message.sender_image || '/default-avatar.png'} 
                                                    alt='user' 
                                                    className='w-[2.8rem] max-[768px]:w-[2rem] m-0 rounded-full' 
                                                />
                                                <div className='overflow-hidden m-0 py-1'>
                                                    <h5 className='font-semibold text-[.95rem] pt-[5px] truncate'>
                                                        {otherUserName}
                                                    </h5>
                                                    <p className='text-[.85rem] mt-[2px] truncate'>
                                                        {last_message.message}
                                                    </p>
                                                </div>
                                                {!conv.opened && <FontAwesomeIcon icon='circle' className='absolute top-[5px] right-[5px] text-[.5rem] text-orange-400' />}
                                            </Link>
                                        </li>
                                    );
                                }) : (
                                    <p className='text-center'>No Message(s)</p>
                                )}
                        </ul>
                    }
                </div>
                <div className={`message-outlet relative flex-1 border border-gray-300 rounded-xl p-4 py-0 pb-2 shadow-lg ${isMessageList ? '' : 'hide-outlet'}`}></div>
                <div className={`message-outlet relative flex-1 border border-gray-300 rounded-xl p-4 py-0 pb-2 shadow-lg ${isMessageList ? 'hide-outlet' : 'small-outlet'}`}>
                    <Outlet />
                </div>
            </div>
        </motion.section>
    )
}

export default Messages

