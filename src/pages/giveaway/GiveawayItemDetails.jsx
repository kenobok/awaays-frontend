import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchGiveawaysItemDetails } from "../../services/fetchServices";
import API from '../../api/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Loader1 } from '../../components/utils/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { SomethingWentWrong } from '../../components/utils/SomethingWentWrong'
import gift from '/src/assets/images/gift.avif';


const GiveawayItemDetails = () => {
    const { slug } = useParams()
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { data, isError, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['giveawayItemDetails', slug],
        queryFn: () => fetchGiveawaysItemDetails(slug),
        enabled: true,
    });
    // const { data: requests, isLoading: isReqLoading, refetch: reload } = useQuery({
    //     queryKey: ['check-item-requests', data?.id],
    //     queryFn: async () => {
    //         if (!data?.id || !user) return [];
    //         const res = await API.get(`/item-requests/?item=${data.id}`);
    //         return res.data;
    //     },
    //     enabled: !!data?.id && !!user,
    // });
    // const hasRequested = requests?.some(req => req?.item.id === data?.id && req?.user.id === user?.id);
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');
    const [messaged, setMessaged] = useState(false);
    const [requested, setRequested] = useState(false);
    const [formData, setFormData] = useState('');
    const [wordLength, setWordLength] = useState('');
    const [loading, setIsLoading] = useState(false);
    const from = location.pathname + location.search;
    const maxLength = 50;


    useEffect(() => {
        const updateStatus = () => {
            const reqStat = JSON.parse(localStorage.getItem(`requested-${data?.id}`));
            const msgStat = JSON.parse(localStorage.getItem(`messaged-${data?.donor?.id}`));
            setRequested(reqStat);
            setMessaged(msgStat);
        };
        updateStatus();

        const handleStorageChange = (e) => {
            if (e.key === `requested-${data?.id}` || e.key === `messaged-${data?.donor?.id}`) {
                updateStatus();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [data?.id, location.pathname]);

    const redirectToVerifyEmail = () => {
        navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`);
    }

    const redirectToAuthPage = () => {
        navigate(`/auth?from=${encodeURIComponent(from)}`);
    }

    const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;

    const handleChange = (e) => {
        const reason = e.target.value;
        const wordCount = countWords(reason);
    
        if (wordCount <= maxLength) {
            setFormData(reason); 
            setWordLength('');
        } else {
            setWordLength(`Maximum of ${maxLength} words allowed`);
        }
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();

        setIsLoading(true)
        if (!requested) {
            try {
                const payload = { item: data.id, reason: formData || '' };
                await API.post(`/item-requests/`, payload)
                toast.success('Your request is sent')
                setFormData('');
                setWordLength('');
                refetch();
                localStorage.setItem(`requested-${data?.id}`, JSON.stringify(true))
                setRequested(true)
            } catch(error) {
                const err = error?.response?.data
                if (err.non_field_errors) {
                    toast.error('You already requested for this item')
                    localStorage.setItem(`requested-${data?.id}`, JSON.stringify(true))
                    setRequested(true)
                    setFormData(''); 
                    setWordLength('');
                    refetch();
                } else {
                    toast.error('An error occurred, try again')
                }
            } finally {
                setIsLoading(false)
            }
        } else {
            if (!message.trim()) {
                setMessageError('Message cannot be blank')
                setIsLoading(false)
                return
            } else {
                setMessageError('')
                try {
                    await API.post(`account/conversations/`, {
                        participant_2_id: data.donor.id,
                        initial_message: message
                    })
                    setMessage('')
                    toast.success('Message sent to donor')
                    localStorage.setItem(`messaged-${data?.donor?.id}`, JSON.stringify(true))
                    setMessaged(true)
                } catch (error) {
                    const err = error?.response?.data
                    if (err == "A conversation with this user already exists.") {
                        toast.warning('You’ve already started a conversation. Continue it from your dashboard.')
                        setMessage('')
                        localStorage.setItem(`messaged-${data?.donor?.id}`, JSON.stringify(true))
                        setMessaged(true)
                        navigate('/dashboard/messages')
                    } else {
                        toast.error('An error occurred')
                    }
                } finally {
                    setIsLoading(false)
                }
            }
        }
    }


    return (
        <main className={`relative mt-[9rem] max-[941px]:mt-[6rem] flex w-full h-full max-[768px]:block max-[768px]:p-5 overflow-y-auto overflow-x-hidden`}>
            { isLoading ? <div className='h-[75vh] w-full'><Loader1 /></div> :
                !data || isError ?
                    <SomethingWentWrong onHandleRefresh={refetch} isError={isError} isFetching={isFetching} />
                :
                <>
                    <section className="flex-1 overflow-hidden">
                        <motion.div className="flex-1 modal-img overflow-hidden m-auto max-[768px]:mb-5" initial={{ opacity: 0, x: -300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }}>
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay, EffectCards, Mousewheel]}
                                spaceBetween={0}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 3000, disableOnInteraction: false }}
                                mousewheel={true}
                                className={`modal-img-slide ${isEnlarged ? 'enlarge-img bg-gray-700 cursor-zoom-out' : '' }`}
                            >
                                {
                                    data?.images.length>0 ? 
                                        data?.images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img src={image} alt={`slide-${index}`} loading='lazy' className={`w-full h-[30rem] m-auto rounded-xl object-contain transition-transform duration-300 ${isEnlarged ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => {setIsEnlarged(!isEnlarged)}}/>
                                            </SwiperSlide>
                                        ))
                                    :
                                        <SwiperSlide>
                                            <img src={gift} alt={`giveaway`} loading='lazy' className={`w-full h-[30rem] m-auto rounded-xl object-contain transition-transform duration-300 ${isEnlarged ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => {setIsEnlarged(!isEnlarged)}}/>
                                        </SwiperSlide>
                                }
                            </Swiper>
                        </motion.div>
                    </section>
                    <section className="flex-1">
                        <motion.div className="flex-1 modal-text overflow-auto pl-10 py-3 max-[768px]:pl-0 m-auto" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} >
                            <h3 className="text-[1.5rem] mb-2 font-bold leading-[1.8rem]">{data.purpose}</h3>
                            <h3 className="text-[1.2rem] font-semibold leading-[1.5rem]">{data.name}</h3>
                            <h5 className="my-4 mb-6 inline-block border border-orange-400 px-5 py-2 rounded-md shadow-md" style={{color:'#fd7e14'}}>{data.purpose == 'General Giveaway' ? `${data.request_count}  - Request(s)` : 'Handled By  Awaays'}</h5>
                            <div className="mb-3">
                                <h3 className="text-[1.1rem] font-semibold">Description</h3>
                                <p className="leading-[1.3rem]">{data.description}</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[1.1rem] font-semibold">Instructions</h3>
                                <p className="leading-[1.3rem]">{data.instruction || '(No instructions)'}</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[1.1rem] font-semibold">Location</h3>
                                <p className="leading-[1.3rem]">{data.state}, {data.country}</p>
                            </div>
                            <div className="relative my-7">
                                <div className='flex justify-between items-center absolute border border-green-500 border-r-0 text-green-600 shadow-lg py-[5px] pl-10 pr-5 max-[768px]:pr-0 rounded-s-3xl top-0 right-0'>
                                    <div className='flex-1'>
                                        <p className={`text-green-700 font-semibold ${data.show_number == 'True' && user && user.is_verified ? 'pt-[.2rem] pb-[.3rem] border-b border-gray-400' : ''}`}><FontAwesomeIcon icon='user' /> {data.donor.full_name}</p>
                                        { data.show_number == 'True' && user && user.is_verified && <div className='text-blue-800 pt-[.4rem]'><FontAwesomeIcon icon='phone' /> <a href={data.purpose === "General Giveaway" && `tel:${data.donor.mobile}`} className='inline-block tracking-[.5px] font-semibold'>{data.purpose === "General Giveaway" && data.donor.mobile ? data.donor.mobile : '---------------------'}</a></div> }
                                    </div>
                                    <img src={data.donor.profile_image} alt='pic' className='w-[50px] h-[50px] object-cover rounded-full ml-4' />
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className={`w-full pr-1 justify-evenly ${data.show_number == 'True' ? 'mt-[8rem]' : 'mt-[7rem]'}`}>
                                { requested ?
                                    <>
                                        <div className='form-input'>
                                            <textarea className={`h-[7rem] resize-none disabled:cursor-not-allowed ${messageError ? 'error' : ''}`} placeholder='Send message to donor' value={message} onChange={(e) => {setMessage(e.target.value)}} disabled={ messaged }></textarea>
                                            <small>{messageError && messageError}</small>
                                        </div>
                                        <button className="my-3 bg-[var(--p-color)] text-white py-3 px-5 rounded-xl shadow-md cursor-pointer disabled:bg-[var(--s-color)] disabled:cursor-not-allowed" disabled={loading || messaged}>{ loading ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.3rem] text-white' /> : 'Send message' }</button>
                                    </>
                                    :
                                    <>
                                        <div className='form-input'>
                                            <textarea className='h-[7rem] resize-none disabled:cursor-not-allowed' placeholder='Reason for request (Optional)' value={formData} onChange={handleChange} disabled={data.purpose !== 'General Giveaway' || !user || !user.is_verified || user?.id === data.donor.id || requested || requested || user?.country !== data?.country}></textarea>
                                            <p className='absolute right-[5px] text-[.95rem]'>{countWords(formData)}/{maxLength} words </p>{wordLength && <small>{wordLength}</small>}
                                        </div>
                                        <button className="my-3 bg-[var(--p-color)] text-white py-3 px-5 rounded-xl shadow-md cursor-pointer disabled:bg-[var(--s-color)] disabled:cursor-not-allowed" disabled={data.purpose !== 'General Giveaway' || !user || !user.is_verified || loading || user?.id === data.donor.id || requested || user?.country !== data?.country}>{ loading ? <FontAwesomeIcon icon='fa-spinner' className='animate-spin text-[1.3rem] text-white' /> : 'Request Item' }</button>
                                    </>
                                }
                                { data.purpose !== 'General Giveaway' ? 
                                <p className=''>
                                    Only <b>General Giveaway</b> items can be requested. <br/>
                                    Visit <Link to='/how-it-works/#scroll-to-view' className='font-bold text-[var(--p-color)] cursor-pointer'>How It Works</Link> page to learn more.....
                                </p>
                                :
                                <>
                                { requested && <p className='text-orange-500'>You have requested for this item.....<Link to='/dashboard/my-requests' className='text-[var(--p-color)]'>view my requests</Link></p>}
                                { messaged && <p className='text-gray-800'>Continue chatting with donor.....<Link to={`/dashboard/messages`} className='text-[var(--p-color)]'>view my chats</Link></p>}
                                { user && user.id === data.donor.id && <p className='text-orange-500'>You cannot request for your giveaway...</p>}
                                { user && !user.is_verified && <p className=''>To request items, you must <Link className='text-[var(--p-color)] font-semibold' onClick={() => redirectToVerifyEmail()}>Verify Your Email </Link></p>}
                                { !user && <p className=''><Link className='text-[var(--p-color)] font-semibold' onClick={() => redirectToAuthPage()}>Sign Up | Sign In </Link>  to request item</p> }
                                { user && user?.id !== data.donor.id && user?.country !== data?.country && <p className='text-orange-500'>You cannot request for giveaways in a different country</p> }
                                </>
                                }
                            </form>
                        </motion.div>
                    </section>
                </>
            }
        </main>
    )
}


export default GiveawayItemDetails
