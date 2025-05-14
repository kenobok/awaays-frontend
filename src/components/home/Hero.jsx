import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import free from '../../assets/animations/free.json'
import hhb from '../../assets/animations/hhb.json'
import mcbw from '../../assets/animations/mcbw.json'
import mrin from '../../assets/animations/mrin.json'

const Hero = () => {

    return (
        <section className={`hero relative block min-[993px]:flex justify-evenly align-center gap-x-5 p-5 mb-10`}>
            <div className="absolute inset-0 bg-[rgba(0,0,0,.8)] backdrop-blur-[3px]"></div>
            <motion.div initial={{ opacity: 0, x: -500 }} animate={{ opacity: 1, x: 0 }} transition={{duration: 1.5, ease: "easeInOut"  }} className="hero-text m-auto w-full z-3">
                <h1>Why Keep It?</h1><h1>Someone Needs it!</h1><h1>Give It Away!</h1>
                <p>Give away what you don’t need or find something you need <b className="text-indigo-300">FOR FREE.</b> Join our community and share the joy of giving.</p>
                <div className="flex justify-evenly mt-5 py-2">
                    <div className='relative inline-block'>
                        <Link to="/give-item" className="inline-block bg-[var(--p-color)] text-white py-2 px-4 rounded-xl">Give Item</Link>
                        <Lottie className='w-[200px] max-[768px]:w-[170px] absolute top-[1.5rem] left-1/2 transform -translate-x-1/2 min-[993px]:hidden -z-1' animationData={hhb} loop={true} autoplay={true} style={{ transform: 'rotate(-12deg)' }} />   
                    </div>
                    <Link to="/giveaway-items" className="inline-block bg-gray-900 text-white py-2 px-4 rounded-xl">Giveaways</Link>
                </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeInOut"  }} className="hero-anim relative flex-col justify-center align-center relative w-full h-[38rem] max-[993px]:h-[35rem] max-[768px]:h-[30rem] max-[451px]:h-[27rem] z-3">
                {/* <motion.div animate={{ x: [0, 350, 0] }} transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}><Lottie className='absolute left-[-8rem]' animationData={free} loop={true} autoplay={true} style={{ height: 200, width: 200 }} /></motion.div> */}
                <Lottie className='w-[200px] absolute left-[0] top-[-2rem] max-[993px]:hidden' animationData={hhb} loop={true} autoplay={true} style={{ transform: 'rotate(-5deg)' }} />
                <Lottie className='w-[800px] max-[768px]:w-[600px] max-[451px]:w-[450px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-[993px]:pr-[5rem]' animationData={mrin} loop={true} autoplay={true} />
            </motion.div>
        </section>
    );
};

export default Hero;




