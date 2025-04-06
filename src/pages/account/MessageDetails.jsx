import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MessageDetails = () => {
    const location = useLocation();

    return (
        <div className={``}>
            <div className='relative space-y-3 mt-4 h-[55.7vh] overflow-x-hidden overflow-y-auto'>
                <div className='flex justify-start relative w-[70%] max-[1081px]:w-[80%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] bg-blue-100 rounded-lg'>For the best mobile experience, use Option 2 (Card Layout on Mobile) since it removes the need for horizontal scrolling and makes the content easy to read.</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
                <div className='flex justify-end relative w-[100%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] w-[70%] max-[1081px]:w-[80%] text-white bg-blue-400 rounded-lg'>For the best mobile experience</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
                <div className='flex justify-start relative w-[70%] max-[1081px]:w-[80%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] bg-blue-100 rounded-lg'>In my giveaway website is it recommended for user to give reason why they need an item or just a request button is okay? In my giveaway website is it recommended for user to give reason why they need an item or just a request button is okay? For the best mobile experience, since it removes the need for horizontal scrolling and makes the content easy to read.</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
                <div className='flex justify-end relative w-[100%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] w-[70%] max-[1081px]:w-[80%] text-white bg-blue-400 rounded-lg'>For the best mobile experience, since it removes the need for horizontal scrolling and makes the content easy to read.</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
                <div className='flex justify-start relative w-[70%] max-[1081px]:w-[80%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] bg-blue-100 rounded-lg'>since it removes the need for breakup is horizontal scrolling and makes the content easy to read.</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
                <div className='flex justify-end relative w-[100%]'>
                    <p className='text-[.93rem] leading-[1.1rem] p-[10px] w-[70%] max-[1081px]:w-[80%] text-white bg-blue-400 rounded-lg'>For the best mobile for, use Option 2 (Card Layout on Mobile) since it removes the need for horizontal scrolling and makes the content easy to read.</p>
                    <address className='absolute bottom-[-3px] right-2 text-black text-[.7rem]'>12:56 PM</address>
                </div>
            </div>

            <div className='w-full h-20 mt-2'>
                <form className='h-full flex'>
                    <textarea className='border border-gray-300 h-full w-full resize-none leading-[1.1rem] p-2 px-3 rounded-lg text-[.93rem] focus:outline-[var(--p-color)]' placeholder='Enter your message'></textarea>
                    <button className='text-white bg-[var(--p-color)] leading-[1.2rem] rounded-lg cursor-pointer'><FontAwesomeIcon icon='envelope' /> Send</button>
                </form>
            </div>
        </div>
    )
}

export default MessageDetails
