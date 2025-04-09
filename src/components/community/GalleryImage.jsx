import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '/src/assets/styles/community.css';


const GalleryImage = ({src, caption, zoomIn, onClick}) => {

    return (
        <motion.div className={`gallery-img relative w-15rem shadow-lg rounded-lg`} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
            <img src={src} alt={`image`} className={`w-full object-cover cursor-zoom-in rounded-lg ${zoomIn ? 'zoom-in bg-gray-700 rounded-none' : ''}`} onClick={onClick} />
            <p className='w-full text-[.9rem] leading-[1rem] p-2'>{caption}</p>
            <small className={`fixed top-[1rem] right-2 z-6 font-[400] text-[1rem] text-orange-500 bg-[rgba(0,0,0,.4)] px-3 pt-1 rounded-full ${zoomIn ? '' : 'hidden'}`}>Click anywhere to exit full screen</small>
        </motion.div>
    )
}


export { GalleryImage }
