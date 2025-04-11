// /src/components/community/GalleryGrid.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { GalleryImage } from './GalleryImage';


const GalleryGrid = ({ images }) => {
    const [activeZoomIndex, setActiveZoomIndex] = useState(null);

    const handleZoom = (index) => {
        setActiveZoomIndex(prev => prev === index ? null : index);
    };

    return (
        <motion.div className='gap-5 grid grid-cols-5 max-[1201px]:grid-cols-4 max-[1080px]:grid-cols-3 max-[577px]:grid-cols-2 gap-7 max-[941px]:gap-x-5 p-5 pb-50 max-[561px]:gap-x-3' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
            {
                images.map((image, index) => (
                    <GalleryImage key={index} src={image.src} caption={image.caption} zoomIn={activeZoomIndex === index} onClick={() => handleZoom(index)}/>
                ))
            }
        </motion.div>
    );
};

export default GalleryGrid;
