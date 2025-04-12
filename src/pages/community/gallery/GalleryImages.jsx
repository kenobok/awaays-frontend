import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'
import { galleries } from '/src/components/utils/UtilsData'
import { GalleryImage } from '/src/components/community/GalleryImage';
import { Loader1 } from '/src/components/utils/Preloader';


const GalleryImages = () => {
    const location = useLocation();
    const [activeZoomIndex, setActiveZoomIndex] = useState(null);

    const gallery = useMemo(() => {
        return galleries.find(g => location.pathname.includes(g.slug));
    }, [location.pathname, galleries])

    const handleZoom = (index) => {
        setActiveZoomIndex(prev => prev === index ? null : index);
    };


    return (
        <div className='ml-10 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.4rem] font-semibold mb-5 border-b border-gray-200'>{ gallery.name }</h3>
            {
                galleries || gallery ?
                    gallery.galleryImages.length>0 ?
                    <motion.div className='gap-5 grid grid-cols-5 max-[1201px]:grid-cols-4 max-[1080px]:grid-cols-3 max-[577px]:grid-cols-2 gap-7 max-[941px]:gap-x-5 p-5 pb-50 max-[561px]:gap-x-3' initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                        {
                            gallery.galleryImages.map((image, index) => (
                                <GalleryImage key={index} src={image.src} caption={image.caption} zoomIn={activeZoomIndex === index} onClick={() => handleZoom(index)}/>
                            ))
                        }
                    </motion.div>
                    :
                    <p className='text-center py-10 font-semibold'>No images available</p>
                :
                    <Loader1 />
            }
        </div>
    )
}

export default GalleryImages

