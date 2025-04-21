import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { messages } from '../../components/utils/UtilsData'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MessageDetails = () => {
    const { slug } = useParams();
    const [user, setUser] = useState(null);

    const message = useMemo(() => {
        return messages.find(msg => msg.slug === slug);
    }, [slug])

    useEffect(() => {
        if (message) {
            setUser(message.participants[1]);
        }
    }, [message]);


    return (
        <>
            <p className='pt-1 text-center border-b border-gray-300'>Chat with {message && message.participants.find(name => name !== user)}</p>
            <div className={`h-full py-0`}>
                <div className='relative h-[58vh] overflow-x-hidden overflow-y-auto'>
                        { 
                            message.conversation.length > 0 ? message.conversation.map((msg, index) => (
                                <div key={index} className={`flex relative ${msg.receiver === user ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`relative p-[10px] pb-[5px] mt-3 max-w-[70%] max-[1081px]:max-w-[80%] rounded-lg ${msg.receiver === user ? 'bg-blue-200' : 'bg-gray-200'}`}>
                                        <p className='text-[.93rem] leading-[1rem] mb-1'>{msg.message}</p>
                                        <address className='text-black text-[.66rem]'>12:56 PM || 21/04/2025</address>
                                        <FontAwesomeIcon icon='circle' className={`absolute bottom-[5px] right-[5px] text-[.55rem] ${msg.read ? 'text-blue-600' : 'text-gray-400'}`} />
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
