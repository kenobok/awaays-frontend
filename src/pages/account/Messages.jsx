import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { messages } from '../../components/utils/UtilsData';
import user from '../../assets/images/user.png';


const Messages = () => {
    const location = useLocation();
    const [isMessageList, setIsMessageList] = useState(true);

    useEffect(() => {
        setIsMessageList(location.pathname === '/dashboard/messages' || location.pathname === '/dashboard/messages/')
    }, [location.pathname])


    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-xl font-bold text-center border-b border-gray-100'>Messages</h2>
            <div className='flex justify-evenly flex-wrap gap-5'>
                <div className={`message-list border border-gray-300 rounded-xl p-4 py-3 shadow-lg w-[18rem] max-[651px]:flex-1 max-[768px]:w-[15rem] h-[72vh] overflow-x-hidden overflow-y-auto ${isMessageList ? '' : 'hide-list'}`}>
                    <ul className={`space-y-3 mt-4`}>
                        {
                            messages.length > 0 ? messages.map((message, index) => {
                                const lastMessage = message.conversation[message.conversation.length - 1];

                                return (
                                    <li key={index}>
                                        <Link to={`/dashboard/messages/${message.slug}`} className='relative space-y-2 flex gap-x-3 p-[8px] items-center leading-[1.1rem] rounded-lg shadow cursor-pointer'>
                                            <img src={lastMessage.senderImage} alt='user' className='w-[2.8rem] max-[768px]:w-[2rem] m-0 rounded-full' />
                                            <div className='overflow-hidden m-0 py-1'>
                                                <h5 className='font-semibold text-[.95rem] pt-[5px] truncate'>{lastMessage.sender}</h5>
                                                <p className='text-[.85rem] mt-[2px] truncate'>{lastMessage.message}</p>
                                            </div>
                                            {!message.opened && <FontAwesomeIcon icon='circle' className='absolute top-[5px] right-[5px] text-[.5rem] text-orange-400' />}
                                        </Link>
                                    </li>
                                );
                            }) : (
                                <p className='text-center'>No Message(s)</p>
                            )
                        }
                    </ul>
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

