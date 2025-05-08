import { useState, useEffect, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchConversationsDetails } from '../../services/fetchServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader1 } from '../../components/utils/Preloader';


const MessageDetails = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(null);

    const { data: conversation, isLoading } = useQuery({
        queryKey: ['conversation', slug],
        queryFn: () => fetchConversationsDetails(slug),
    });


    return (
        <>
            <p className='pt-1 text-center border-b border-gray-300 text-sm'>Chats with { conversation?.participant_1_id === user?.id ? conversation?.participant_2_name : conversation?.participant_1_name }</p>
            <div className={`h-full py-0`}>
                <div className='relative h-[58vh] overflow-x-hidden overflow-y-auto'>
                        { 
                            isLoading ? <div className='h-[100%]'><Loader1 /></div> :
                            conversation?.messages?.length > 0 ? conversation?.messages.map((msg, index) => (
                                <div key={index} className={`flex relative ${msg.receiver === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`relative p-[10px] pb-[5px] mt-3 max-w-[70%] max-[1081px]:max-w-[80%] rounded-lg ${msg.receiver === user.id ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                        <p className='text-[.93rem] leading-[1rem] mb-1'>{msg.message}</p>
                                        <address className='text-black text-[.66rem] mr-7'>{msg.time.slice(0, 5)} || {msg.date}</address>
                                        { msg.receiver === user.id && <FontAwesomeIcon icon={`${msg.read ? 'eye' : 'eye-slash'}`} className={`absolute bottom-[8px] right-[7px] text-[.6rem] ${msg.read ? 'text-blue-600' : 'text-gray-400'}`} /> }
                                    </div>
                                </div>
                            )) : <p>No Conversation</p>
                        }
                </div>

                <div className='w-full h-18 mt-2 bg-white'>
                    <form className='h-full flex'>
                        <textarea className='border border-gray-300 h-full w-full resize-none leading-[1.1rem] p-2 px-3 rounded-lg text-[.93rem] focus:outline-[var(--p-color)]' placeholder='Enter your message'></textarea>
                        <button className='text-white bg-[var(--p-color)] leading-[1.2rem] rounded-lg cursor-pointer'><FontAwesomeIcon icon='paper-plane' /> Send</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default MessageDetails
