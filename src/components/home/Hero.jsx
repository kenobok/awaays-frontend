import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules'
import { motion } from "framer-motion";
import { heroImages } from '../utils/UtilsData'
import { Loader1 } from '../utils/Preloader'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

const Hero = () => {

    return (
        <section className={`hero relative block min-[993px]:flex justify-evenly align-center gap-x-5 p-5`}>
            <div className="absolute inset-0 bg-[rgba(0,0,0,.7)] backdrop-blur-[3px]"></div>
            <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 1.5, ease: "easeInOut"  }} className="hero-text m-auto">
                <h1>Why Keep It?</h1><h1>Someone Needs it!</h1><h1>Give It Away!</h1>
                <p>Give away what you don’t need or find something you need <b className="text-cyan-500">FOR FREE.</b> Join our community and share the joy of giving.</p>
                <div className="flex justify-evenly mt-5 py-2">
                    <Link to="/give-item" className="inline-block bg-[var(--p-color)] text-white py-2 px-4 rounded-xl">Give Item</Link>
                    <Link to="/giveaway-items" className="inline-block bg-gray-900 text-white py-2 px-4 rounded-xl">Giveaways</Link>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut"  }} className="hero-slide-wrp">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCards, Mousewheel]}
                    spaceBetween={0}
                    slidesPerView={1}
                    // navigation
                    pagination={{ clickable: true }}
                    autoplay={{delay: 3000, disableOnInteraction: false,}}
                    effect={'cards'}
                    mousewheel={true}
                    className="hero-slide"
                    >
                    { heroImages ? heroImages.map((image, index) => (
                        <SwiperSlide key={index}><img src={image.src} alt={`Slide ${index}`} /></SwiperSlide>
                    )) :
                    <Loader1 />}
                </Swiper>
            </motion.div>
        </section>
    );
};

export default Hero;




