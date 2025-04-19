import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';
import mockItems from "../../components/giveaway/mockItems";
import { Loader1 } from '../../components/utils/Preloader';



const GiveawayItemDetails = () => {
    const { itemId } = useParams()
    const [ viewItem, setViewItem ] = useState({})
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState('')
    const [wordLength, setWordLength] = useState('')
    const maxLength = 50;


    useEffect(() => {
        const fetcher = mockItems.find(item => item.id == itemId);
        if (fetcher) {
            setViewItem(fetcher);
            setLoading(false)
        }
    }, [itemId]);

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
            { loading ? <div className='h-[75vh]'><Loader1 /></div> :
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
                            {viewItem.images ? (
                                viewItem.images.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={image} alt={`slide-${index}`} className={`w-full h-[30rem] m-auto rounded-xl object-contain transition-transform duration-300 ${isEnlarged ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => {setIsEnlarged(!isEnlarged)}}/>
                                    </SwiperSlide>
                                ))
                            ) : (
                                <p>No images available</p>
                            )}
                        </Swiper>
                    </motion.div>
                </section>
                <section className="flex-1">
                    <motion.div className="flex-1 modal-text overflow-auto pl-10 py-3 max-[768px]:pl-0 m-auto" initial={{ opacity: 0, x: 300 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeInOut" }} >
                        <h3 className="text-[1.5rem] mb-2 font-bold leading-[1.8rem]">{viewItem.purpose}</h3>
                        <h3 className="text-[1.2rem] font-semibold leading-[1.5rem]">{viewItem.name}</h3>
                        <h5 className="my-4 mb-6 inline-block border border-orange-400 px-5 py-2 rounded-md shadow-md" style={{color:'#fd7e14'}}>{viewItem.request > 0 ? viewItem.request : 0} - Request(s)</h5>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Description</h3>
                            <p className="leading-[1.3rem]">{viewItem.description}</p>
                        </div>
                        <div className="mb-3">
                            <h3 className="text-[1.1rem] font-semibold">Instructions</h3>
                            <p className="leading-[1.3rem]">{viewItem.instruction}</p>
                        </div>
                        <div className="relative my-5">
                            <p className="absolute border border-green-500 text-green-600 shadow-lg py-[3px] px-7 rounded-s-3xl top-0 right-0" style={{borderRight:'0'}}><b>Donor - </b>{viewItem.donor}</p>
                        </div>
                        <form className="mt-[4rem] w-full pr-1 justify-evenly">
                            <div className='form-input'>
                                <textarea className='h-[7rem] resize-none' placeholder='Reason for request (Optional)' onChange={handleChange}></textarea>
                                <p className='absolute right-[5px] text-[.95rem]'>{countWords(formData)}/{maxLength} words </p>{wordLength && <small>{wordLength}</small>}
                            </div>
                            <button className="mt-4 bg-[var(--p-color)] text-white py-3 px-5 rounded-xl shadow-md cursor-pointer">Request Item</button>
                        </form>
                    </motion.div>
                </section>
            </>
            }
        </main>
    )
}


export default GiveawayItemDetails
