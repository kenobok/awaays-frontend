import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from '../../assets/images/user.png';


const Messages = () => {
    const location = useLocation();
    const [isMessageList, setIsMessageList] = useState(true);

    useEffect(() => {
        setIsMessageList(location.pathname === '/dashboard/messages' || location.pathname === '/dashboard/messages/')
        console.log(isMessageList + ' path');
    }, [location.pathname])

    const messages = [
        { 
            id: 1,
            senderName: "Oluwakemi Oyedola", 
            message: "Hello, good morning",
        },
        {
            id: 2, 
            senderName: "Michael Emeka", 
            message: "Tailwind CSS applies a very dark purple background color (#4A044E). It’s useful for dark themes, buttons, headers, or sections needing a deep purple background. Tailwind CSS applies a very dark purple background color (#4A044E). It’s useful for dark themes, buttons, headers, or sections needing a deep purple background.",
        },
        {
            id: 3, 
            senderName: "Peter Muhammed", 
            message: "For a giveaway website, exposing item IDs is generally fine if the backend prevents unauthorized access. However, if privacy is a concern, consider UUIDs or encrypted IDs.",
        },
    ]


    return (
        <motion.section className={`space-y-7 flex-1 p-7 pb-20 max-[941px]:px-5`} initial={{ opacity: 0, x: -300 }}  animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h2 className='text-2xl font-bold text-center border-b border-gray-100'>Messages</h2>
            <div className='flex justify-evenly flex-wrap gap-5'>
                <div className={`message-list border border-gray-300 rounded-xl p-4 py-3 shadow-lg w-[18rem] max-[651px]:flex-1 max-[768px]:w-[15rem] h-[72vh] overflow-x-hidden overflow-y-auto ${isMessageList ? '' : 'hide-list'}`}>
                    <ul className={`space-y-3 mt-4`}>
                        {
                            messages.length>0 ? messages.map((message, index) => (
                                <li key={index}>
                                    <Link to={`/dashboard/messages/${message.id}`} className='relative space-y-2 flex gap-x-3 p-[8px] items-center leading-[1.1rem] rounded-lg shadow cursor-pointer'>
                                        <img src={user} alt='user' className='w-[2.8rem] max-[768px]:w-[2rem]' />
                                        <div className='overflow-hidden'>
                                            <h5 className='font-semibold text-[.95rem] pt-[5px] truncate'>{message.senderName}</h5>
                                            <p className='text-[.85rem] mt-[2px] truncate'>{message.message}</p>
                                        </div>
                                        <FontAwesomeIcon icon='circle' className='absolute top-[5px] right-[5px] text-[.65rem] text-orange-400'/>
                                    </Link>
                                </li>
                            ))
                            :
                            <p className='text-center'>No Message</p>
                        }
                    </ul>
                </div>
                <div className={`message-outlet relative flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg ${isMessageList ? '' : 'hide-outlet'}`}></div>
                <div className={`message-outlet relative flex-1 border border-gray-300 rounded-xl p-4 py-3 shadow-lg ${isMessageList ? 'hide-outlet' : 'small-outlet'}`}>
                    <Outlet />
                </div>
            </div>
        </motion.section>
    )
}

export default Messages

