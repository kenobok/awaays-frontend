import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchConversationsDetails } from '../../services/fetchServices';
import API from '../../api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader1 } from '../../components/utils/Preloader';


const MessageDetails = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const messageEndRef = useRef(null);

    const { data: conversation, isLoading, refetch } = useQuery({
        queryKey: ['conversation', slug],
        queryFn: () => fetchConversationsDetails(slug),
        refetchOnWindowFocus: false,
        refetchInterval: 5000,
        enabled: true,
    });

    useEffect(() => {
        if (conversation?.messages) {
            setMessages(conversation.messages);
        }
    }, [conversation?.messages]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation, messages]);

    const formatTo12Hour = (timeStr) => {
        if (!timeStr) return '';
        let [hour, minute] = timeStr.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; 
        return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const tempId = `temp-${Date.now()}`;

        const tempMsg = {
            id: tempId,
            message: newMessage.trim(),
            sender: user.id,
            time: new Date().toTimeString().slice(0, 5),
            date: new Date().toISOString().slice(0, 10),
            read: false,
            status: 'pending',
        };

        setMessages((prev) => [...prev, tempMsg]);
        setNewMessage('');

        try {
            await API.post(`account/conversations/${slug}/messages/`, {
                message: tempMsg.message,
            });

            refetch();
        } catch (error) {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === tempId ? { ...msg, status: 'failed' } : msg
                )
            );
        }
    };


    return (
        <>
            <p className='pt-1 text-center border-b border-gray-300 text-sm'>
                Chats with {conversation?.participant_1_id === user?.id ? conversation?.participant_2_name : conversation?.participant_1_name}
            </p>

            <div className={`h-full py-0`}>
                <div className='relative h-[58vh] overflow-x-hidden overflow-y-auto px-2'>
                    {
                        isLoading ? (
                            <div className='h-[100%]'><Loader1 /></div>
                        ) : messages?.length > 0 ? (
                            messages.map((msg, index) => (
                                <div key={index} className={`flex relative ${msg.sender === user.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`relative p-[10px] pb-[5px] mt-3 max-w-[70%] max-[1081px]:max-w-[80%] rounded-lg ${msg.sender === user.id ? 'bg-blue-100' : 'bg-gray-100'} ${msg.status === 'failed' ? 'border border-red-500' : ''}`}>
                                        <p className='text-[.93rem] leading-[1rem] mb-1'>{msg.message}</p>
                                        <address className='text-black text-[.66rem] mr-7'>{formatTo12Hour(msg.time)} || {msg.date}</address>
                                        {msg.sender === user.id && (
                                            <FontAwesomeIcon icon={msg.read ? 'eye' : 'eye-slash'} className={`absolute bottom-[8px] right-[7px] text-[.6rem] ${msg.read ? 'text-blue-600' : 'text-gray-400'}`}/>
                                        )}
                                        {msg.status === 'failed' && (
                                            <span className="absolute bottom-[8px] right-[5px] text-[.6rem] text-red-500">Failed</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : <div className='w-full h-full flex justify-center items-center'><p>No Conversation</p></div>
                    }

                    <div ref={messageEndRef} />
                </div>

                <div className='w-full h-18 mt-2 bg-white'>
                    <form className='h-full flex gap-2 items-end' onSubmit={handleSend}>
                        <textarea
                            className='border border-gray-300 h-full w-full resize-none leading-[1.1rem] p-2 px-3 rounded-lg text-[.93rem] focus:outline-[var(--p-color)]'
                            placeholder='Enter your message'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        ></textarea>
                        <button type='submit' className='text-white bg-[var(--p-color)] h-full py-2 px-4 rounded-lg cursor-pointer'>
                            <FontAwesomeIcon icon='paper-plane' /> Send
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MessageDetails;

