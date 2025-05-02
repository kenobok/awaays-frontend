import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchGiveawaysItemDetails } from "../../services/fetchServices";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Loader1 } from '../../components/utils/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import no_network from '../../assets/images/no-network.png'


const useGiveawayItemDetails = (slug) => {
    return useQuery({
        queryKey: ['giveawayItemDetails', slug],
        queryFn: () => fetchGiveawaysItemDetails(slug), 
        enabled: !!slug, 
    });
};

const GiveawayItemDetails = () => {
    const { slug } = useParams()
    const location = useLocation();
    const navigate = useNavigate();
    const { data, error, isLoading, refetch } = useGiveawayItemDetails(slug);
    const { user } = useAuth();
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [formData, setFormData] = useState('')
    const [wordLength, setWordLength] = useState('')
    const maxLength = 50;

    const from = location.pathname + location.search;

    const redirectToVerifyEmail = () => {
        navigate(`/auth/verify-email?from=${encodeURIComponent(from)}`, { replace: true });
    }

    const redirectToAuthPage = () => {
        navigate(`/auth?from=${encodeURIComponent(from)}`, { replace: true });
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


    return (
        <main className={`relative mt-[9rem] max-[941px]:mt-[6rem] flex w-full h-full max-[768px]:block max-[768px]:p-5 overflow-y-auto overflow-x-hidden`}>
            { isLoading ? <div className='h-[75vh] w-full'><Loader1 /></div> :
                !data || error ?
                    <div className="flex flex-col justify-center items-center text-center w-full h-[75vh]">
                        <img src={no_network} alt="Connection error" className="w-[15rem]" />
                        <p className="text-orange-500 text-[1rem] font-semibold mb-3">Check your internet connection</p>
                        <button onClick={() => refetch()} className="p-[5px] px-5 border-2 border-[var(--p-color)] text-[var(--p-color)] rounded-xl cursor-pointer">Retry</button>
                    </div>
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
                                    data.images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image} alt={`slide-${index}`} className={`w-full h-[30rem] m-auto rounded-xl object-contain transition-transform duration-300 ${isEnlarged ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => {setIsEnlarged(!isEnlarged)}}/>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                        </motion.div>
                    </section>
                    <section className="flex-1">
                        <motion.div className="flex-1 modal-text overflow-auto pl-10 py-3 max-[768px]:pl-0 m-auto" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} >
                            <h3 className="text-[1.5rem] mb-2 font-bold leading-[1.8rem]">{data.purpose}</h3>
                            <h3 className="text-[1.2rem] font-semibold leading-[1.5rem]">{data.name}</h3>
                            <h5 className="my-4 mb-6 inline-block border border-orange-400 px-5 py-2 rounded-md shadow-md" style={{color:'#fd7e14'}}>{data.request > 0 ? data.request : 0} - Request(s)</h5>
                            <div className="mb-3">
                                <h3 className="text-[1.1rem] font-semibold">Description</h3>
                                <p className="leading-[1.3rem]">{data.description}</p>
                            </div>
                            <div className="mb-3">
                                <h3 className="text-[1.1rem] font-semibold">Instructions</h3>
                                <p className="leading-[1.3rem]">{data.instruction}</p>
                            </div>
                            <div className="relative my-7">
                                <div className='flex justify-between items-center absolute border border-green-500 border-r-0 text-green-600 shadow-lg py-[5px] pl-10 pr-5 max-[768px]:pr-0 rounded-s-3xl top-0 right-0'>
                                    <div className='flex-1'>
                                        <p className={`text-green-700 font-semibold ${data.show_number == 'True' && user && user.is_verified ? 'pt-[.2rem] pb-[.3rem] border-b border-gray-400' : ''}`}><FontAwesomeIcon icon='user' /> {data.donor.full_name}</p>
                                        { data.show_number == 'True' && user && user.is_verified && <div className='text-blue-800 pt-[.4rem]'><FontAwesomeIcon icon='phone' /> <a href={`tel:${data.donor.mobile}`} className='inline-block tracking-[.5px] font-semibold'>{data.donor.mobile}</a></div> }
                                    </div>
                                    <img src={data.donor.profile_image} alt='pic' className='w-[50px] h-[50px] object-cover rounded-full ml-4' />
                                </div>
                            </div>
                            <form className={`w-full pr-1 justify-evenly ${data.show_number == 'True' ? 'mt-[8rem]' : 'mt-[7rem]'}`}>
                                <div className='form-input'>
                                    <textarea className='h-[7rem] resize-none disabled:cursor-not-allowed' placeholder='Reason for request (Optional)' onChange={handleChange} disabled={!user || !user.is_verified}></textarea>
                                    <p className='absolute right-[5px] text-[.95rem]'>{countWords(formData)}/{maxLength} words </p>{wordLength && <small>{wordLength}</small>}
                                </div>
                                <button className="mt-4 bg-[var(--p-color)] text-white py-3 px-5 rounded-xl shadow-md cursor-pointer disabled:bg-[var(--s-color)] disabled:cursor-not-allowed" disabled={!user || !user.is_verified}>Request Item</button>
                                { user && !user.is_verified && <p className='mt-4'>To request items, you must <Link className='text-[var(--p-color)] font-semibold' onClick={() => redirectToVerifyEmail()}>Verify Your Email </Link></p>}
                                { !user && <p className='mt-4'><Link className='text-[var(--p-color)] font-semibold' onClick={() => redirectToAuthPage()}>Sign Up | Sign In </Link>  to request item</p> }
                            </form>
                        </motion.div>
                    </section>
                </>
            }
        </main>
    )
}


export default GiveawayItemDetails
