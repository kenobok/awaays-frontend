import { motion } from 'framer-motion'
import { galleryImages } from '/src/components/utils/UtilsData'
import GalleryGrid from '/src/components/community/GalleryGrid';


const HealthcareSupport = () => {

    return (
        <div className='ml-10 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.4rem] font-semibold mb-5 border-b border-gray-200'>Healthcare Support</h3>
            <GalleryGrid images={galleryImages} />
        </div>
    )
}

export default HealthcareSupport
