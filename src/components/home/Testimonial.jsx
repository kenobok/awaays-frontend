import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { fetchTestimonials } from '../../services/fetchServices'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'


const Testimonial = () => {
    const { data: testimonies, isLoading, refetch, isFetching } = useQuery({
        queryKey: ['testimonials'],
        queryFn: fetchTestimonials,
        refetchOnWindowFocus: true,
        // refetchInterval: 1000 * 60 * 30,
    });


    return (
        <section className="flex-1 w-full overflow-hidden max-[768px]:mb-15 pb-5 my-auto">
            <motion.div className="home-testimonial relative flex items-end min-h-[25rem] max-[768px]:min-h-[400px]" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className="absolute text-center p-7 top-5 left-[50%] transform -translate-x-[50%] rounded-full bg-[rgba(255,255,255,.6)]">
                    <h5 className="font-bold text-[1.7rem]" >Testimonials</h5>
                    <Link to="/community/forums/testimonials" className="inline-block px-2 pt-[2px] mt-1 text-[var(--p-color)] border border-2 border-[var(--p-color)] rounded-full">See more</Link>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCards, Mousewheel]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{delay: 3000, disableOnInteraction: false,}}
                    // effect={'cards'}
                    mousewheel={true}
                    className="testimonial-slide bg-[var(--bg-color)] rounded-2xl w-[80%] max-[501px]:w-[90%] shadow-lg"
                >
                { testimonies?.length>0 ?
                    testimonies?.slice(0, 5).map((testimony, index) => (
                        <SwiperSlide key={index} className="p-7 pb-10 max-[500px]:px-5 max-[500px]:pt-5">
                            <p className="leading-[1.2rem]">{testimony.content}</p>
                            <div className="flex mt-2">
                                <h4 className="font-bold leading-[1.2rem]">{testimony.author.full_name}</h4> 
                                <b className="mx-2 leading-[1.2rem]">|</b> 
                                <address className="leading-[1.2rem]">{testimony.author.region}, {testimony.author.country}</address>
                            </div>
                        </SwiperSlide>
                    ))
                    :
                    isLoading || isFetching ?
                    <p className='text-center py-10'><FontAwesomeIcon icon='spinner' className='animate-spin text-[1.2rem] text-[var(--p-color)]' /></p>
                    :
                    <p className='text-center py-10'>No testimonies available</p>
                }
                    
                </Swiper>
            </motion.div>
        </section>         
    )
}


export default Testimonial
