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
        <>
            {
                images.map((image, index) => (
                    <GalleryImage key={index} src={image.src} caption={image.caption} zoomIn={activeZoomIndex === index} onClick={() => handleZoom(index)}/>
                ))
            }
        </>
    );
};

export default GalleryGrid;
