import { useState, useEffect, useMemo } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchForumsConversations } from '../../../services/fetchServices';
import { useAuth } from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader1 } from '../../../components/utils/Preloader';
import { toast } from 'react-toastify';
import API from '/src/api/axiosInstance';
import '/src/assets/styles/community.css';

const ForumDetails = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const { forums, loading } = useOutletContext();
    const[showComments, setShowComments] = useState(null)
    const [expandedPosts, setExpandedPosts] = useState([]);
    const [conversations, setConversations] = useState(null)
    const [reply, setReply] = useState('');
    const [sending, setSending] = useState(false);
    
    const { data: data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['forums-conversations', slug],
        queryFn: () => fetchForumsConversations(slug),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
    });

    useEffect(() => {
        refetch()
    }, [loading])

    useEffect(() => {
        setConversations(data)
    }, [data])

    useEffect(() => {
        setShowComments(null);
        setExpandedPosts([]);
    }, [slug])

    const handleReadMoreToggle = (index) => {
        setExpandedPosts(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    };

    const handleCommentsToggle = (index) => {
        setShowComments(prev => prev === index ? null : index); 
    }

    const handleLikeConversation = async (id) => {
        const originalConversations = [...conversations]; // Preserve the original
        const clickedConversation = conversations?.find(c => c.id === id);
    
        if (!clickedConversation) return;
    
        const updatedConversations = conversations.map((conv) =>
            conv.id === id ? { ...conv, likes: conv.likes + 1 } : conv
        );
        setConversations(updatedConversations);
    
        try {
            await API.post(`/community/forum-conversations/${id}/like/`);
            toast.success('Liked successfully');
        } catch (error) {
            console.error('Error liking the conversation:', error);
            setConversations(originalConversations); // Roll back to exact original state
            toast.error('You already liked this post');
        }
    };

    const handleLikeReply = async (replyId) => {
        const originalConversations = [...conversations];

        const updatedConversations = conversations.map((conv) => {
            const updatedReplies = conv.replies.map((reply) => {
                if (reply.id === replyId) {
                    return { ...reply, likes: reply.likes + 1 };
                }
                return reply;
            });

            return { ...conv, replies: updatedReplies };
        });

        setConversations(updatedConversations);

        try {
            await API.post(`/community/forum-replies/${replyId}/like/`);
            toast.success('Liked successfully');
        } catch (error) {
            console.error('Error liking the reply:', error);
            setConversations(originalConversations); 
            toast.error('You already liked this reply');
        }
    };

    const handleReply = async (convId) => {
        if (!reply.trim()) return;
        setSending(true);
    
        try {
            const response = await API.post(`/community/forum-replies/`, {
                conversation: convId,
                content: reply
            });
    
            const newReply = {
                ...response.data,
                likes: 0,
                author: {
                    full_name: user.full_name,
                }
            };
    
            const updatedConversations = conversations.map((conv) => {
                if (conv.id === convId) {
                    return {
                        ...conv,
                        replies: [newReply, ...conv.replies]
                    };
                }
                return conv;
            });
    
            setConversations(updatedConversations);
            toast.success('Reply sent');
            setReply('');
        } catch (error) {
            console.log(error);
            toast.error('An error occurred');
        } finally {
            setSending(false);
        }
    };
    


    return (
        <div className='ml-25 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.3rem] font-semibold border-b border-gray-200'>{forums?.find(f => f?.slug === slug)?.name}</h3>
            <div className='py-10 pt-8'>
                <div className='forum mx-auto space-y-5 max-w-4xl pr-5 max-[768px]:px-5'>
                    {isFetching ? <div className='flex justify-center mb-10'><FontAwesomeIcon icon='spinner' className='animate-spin text-[var(--p-color)] text-[1.4rem]' /></div> : ''}
                    {
                        isLoading ? <div className='mt-[10rem]'></div> :
                        conversations?.length>0 ?
                            conversations?.map((conv, index) => (
                                <div key={index} className={`single-discussion relative border-b-2 border-gray-300 pb-4`}>
                                    <h4 className='font-semibold text-[1.1rem] leading-[1.2rem]'>{conv.topic}</h4>
                                    <p className={`leading-[1.3rem] max-[600px]:leading-[1.2rem] ${expandedPosts.includes(index) ? '' : 'line-clamp-3'}`}>{conv.content}</p>
                                    <div className='flex justify-end pr-3'>
                                        {conv.content.length > 250 && (
                                            <button onClick={() => handleReadMoreToggle(index)} className="text-sm text-blue-500 hover:font-bold leading-[1rem] cursor-pointer border border-blue-500 p-[1px] pt-[3px] px-[7px] rounded-full">
                                                {expandedPosts.includes(index) ? 'Show Less' : 'Read More'}
                                            </button>
                                        )}
                                    </div>
                                    <div className='mt-1'>
                                        <p className='font-semibold text-[var(--p-color)] leading-[1.3rem]'>{conv.author.full_name} |<span className='text-gray-700'>|</span> <span className='text-gray-700 text-[0.85rem] italic'>{conv.date}</span></p>
                                    </div>
                                    <div className='flex'>
                                        <button className='mr-5 text-orange-400 hover:text-orange-500 cursor-pointer disabled:cursor-not-allowed' onClick={() => {handleLikeConversation(conv.id)}} disabled={!user || !user.is_verified}><FontAwesomeIcon icon={['fas', 'thumbs-up']}/>({ conv.likes })</button>
                                        <button className='text-blue-400 hover:text-blue-500 cursor-pointer' onClick={() => handleCommentsToggle(index)}><FontAwesomeIcon icon='comment' />({conv.replies.length})</button>
                                    </div>
                                    { showComments === index && 
                                        <div className={`replies mt-3 ml-8`}>
                                            <h4 className='font-semibold text-[1.05rem] mt-7 leading-0'>Comments</h4>
                                            <div className='form-input max-w-lg leading-0'>
                                                <textarea className='resize-none h-[5rem] disabled:cursor-not-allowed' value={reply} name='content' placeholder='Write a comment' style={{ lineHeight:'1rem', fontSize:'.95rem', padding:'7px' }} disabled={!user || !user.is_verified} onChange={(e) => {setReply(e.target.value)}}></textarea>
                                                { !user || !user.is_verified ? <small className='absolute top-[80%] left-0 ml-2'>Signup OR Signin OR Verify your email</small> : '' }
                                                { sending ?
                                                <FontAwesomeIcon icon='spinner' className='animate-spin absolute right-1 bottom-[13px] text-[1.5rem] text-[var(--p-color)]  cursor-pointer' />
                                                :
                                                <FontAwesomeIcon icon='paper-plane' className='absolute right-1 bottom-[13px] text-[2rem] text-[var(--p-color)] cursor-pointer disabled:cursor-not-allowed disabled:text-[var(--s-color)]' disabled={!user || !user.is_verified} onClick={() => {handleReply(conv.id)}}/>
                                                }
                                            </div>
                                            {
                                                conv?.replies &&
                                                conv?.replies.map((reply, index) => (
                                                    <div key={index} className='my-3 pb-2 border-b border-gray-200'>
                                                        <p className='leading-[1rem] text-[0.95rem]'>{ reply.content }</p>
                                                        <div className='flex'>
                                                            <p className='mr-5 font-semibold text-[var(--p-color)] text-[0.9rem] leading-[1.3rem]'>{reply.author.full_name}</p>
                                                            <p className='italic leading-[1.3rem] text-[.8rem]'>{reply.date}</p>
                                                        </div>
                                                        <div className='flex'>
                                                            <button className='mr-5 text-orange-400 hover:text-orange-500 cursor-pointer text-[0.9rem]' onClick={() => handleLikeReply(reply.id)}><FontAwesomeIcon icon={['fas', 'thumbs-up']} />({ reply.likes })</button>
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
                                <h4 className='text-[1.2rem] font-semibold mt-20'>No <b>{ forums?.find(f => f?.slug === slug)?.name || 'data' }</b> available</h4>
                                <p>Click on <b className='mt-5 text-[var(--p-color)]'>{ forums?.find(f => f?.slug === slug)?.button || 'links' }</b> button to create a { forums?.find(f => f?.slug === slug)?.name || 'conversation'}.</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ForumDetails

