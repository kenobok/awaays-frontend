import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules'
import { motion } from "framer-motion";
import img1 from '../../assets/images/hero1.png'
import img2 from '../../assets/images/hero2.png'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

const Hero = () => {


    return (
        <div className={`hero block min-[993px]:flex justify-evenly align-center gap-x-5`}>
            <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1.5, ease: "easeInOut"  }} className="hero-text m-auto">
                <h1>Why Keep It?<br/><span>Someone Needs it!</span><br/>Give It Away!<br/></h1>
                <p>Give away what you don’t need or find something you need <b className="text-[var(--p-color)]">FOR FREE.</b> Join our community and share the joy of giving.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1.5, ease: "easeInOut"  }} className="m-auto hero-slide-wrp">
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
                    <SwiperSlide><img src={img1} alt="slide" /></SwiperSlide>
                    <SwiperSlide><img src={img2} alt="slide" /></SwiperSlide>
                </Swiper>
            </motion.div>
        </div>
    );
};

export default Hero;




