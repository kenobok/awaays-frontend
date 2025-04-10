import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forumConversations } from '/src/components/utils/UtilsData'
import '/src/assets/styles/community.css';

const GiveawayQuestions = () => {
    const[showComments, setShowComments] = useState(null)
    const [expandedPosts, setExpandedPosts] = useState([]);


    const handleReadMoreToggle = (index) => {
        setExpandedPosts(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    const handleCommentsToggle = (index) => {
        setShowComments(prev => prev === index ? null : index); 
    }


    return (
        <div className='ml-25 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.3rem] font-semibold mb-5 border-b border-gray-200'>Giveaway Questions</h3>
            <div className='py-10'>
                <div className='forum mx-auto space-y-5 max-w-4xl pr-5 max-[768px]:px-5'>
                    {
                        forumConversations.length>0 ? 
                        forumConversations.map((item, index) => (
                            <div key={index} className={`single-discussion relative border-b-2 border-gray-300 pb-4`}>
                                <h4 className='font-bold text-[1.1rem] leading-[1.2rem]'>{item.title}</h4>
                                <p className={`leading-[1.3rem] max-[600px]:leading-[1.2rem] ${expandedPosts.includes(index) ? '' : 'line-clamp-3'}`}>{item.content}</p>
                                <div className='flex justify-end pr-3'>
                                    {item.content.length > 250 && (
                                        <button onClick={() => handleReadMoreToggle(index)} className="text-sm text-blue-500 hover:font-bold leading-[1rem] cursor-pointer border-2 border-blue-500 p-[1px] pt-[3.5px] px-[5px] rounded-full">
                                            {expandedPosts.includes(index) ? 'Show Less' : 'Read More'}
                                        </button>
                                    )}
                                </div>
                                <div className='mt-1'>
                                    <p className='font-semibold text-[var(--p-color)] leading-[1.3rem]'>{item.author} |<span className='text-gray-700'>|</span> <span className='text-gray-700 text-[0.85rem] italic'>{item.date}</span></p>
                                </div>
                                <div className='flex'>
                                    <button className='mr-5 text-orange-400 hover:text-orange-500 cursor-pointer'><FontAwesomeIcon icon='thumbs-up' />({item.likes})</button>
                                    <button className='text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => handleCommentsToggle(index)}><FontAwesomeIcon icon='comment' />({item.replies.length})</button>
                                </div>
                                { showComments === index && 
                                    <div className={`replies mt-3 ml-8`}>
                                        <h4 className='font-semibold text-[1.05rem] mt-7 leading-0'>Comments</h4>
                                        <div className='form-input max-w-lg leading-0'>
                                            <textarea className='resize-none h-[5rem]' name='comment' placeholder='Write a comment' style={{ lineHeight:'1rem', fontSize:'.95rem', padding:'7px' }}></textarea>
                                            <FontAwesomeIcon icon='paper-plane' className='absolute right-1 bottom-[13px] text-[2rem] text-[var(--p-color)]  cursor-pointer'/>
                                        </div>
                                        {
                                            item.replies &&
                                            item.replies.map((reply, index) => (
                                                <div key={index} className='my-3 pb-2 border-b border-gray-200'>
                                                    <p className='leading-[1rem] text-[0.95rem]'>{ reply.content }</p>
                                                    <div className='flex'>
                                                        <p className='mr-5 font-semibold text-[var(--p-color)] text-[0.9rem] leading-[1.3rem]'>{reply.author}</p>
                                                        <p className='italic leading-[1.3rem] text-[.8rem]'>{reply.date}</p>
                                                    </div>
                                                    <div className='flex'>
                                                        <button className='mr-5 text-orange-400 hover:text-orange-500 cursor-pointer text-[0.9rem]'><FontAwesomeIcon icon='thumbs-up' />({reply.likes})</button>
                                                        {/* <button className='text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => handleCommentsToggle(index)}><FontAwesomeIcon icon='comment' />({item.replies.length})</button> */}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        ))
                        :
                        <div className='text-center'>
                            <h4 className='text-[1.2rem] font-semibold mt-20'>No discussion available</h4>
                            <p>Click on <b className='mt-5 text-[var(--p-color)]'>Start Discussion</b> button to create a discussion.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GiveawayQuestions
