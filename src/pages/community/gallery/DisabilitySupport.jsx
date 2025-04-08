import { motion } from 'framer-motion'
import { galleryImages } from '/src/components/utils/UtilsData'
import { GalleryImage } from '/src/components/community/GalleryImage'


const DisabilitySupport = () => {

    return (
        <div className='ml-10 max-[768px]:ml-0'>
            <h3 className='text-center text-[1.4rem] font-semibold mb-5 border-b border-gray-200'>Disability Support</h3>
            <motion.div className='gap-5 grid grid-cols-5 max-[1201px]:grid-cols-4 max-[993px]:grid-cols-3 max-[577px]:grid-cols-2 gap-7 max-[941px]:gap-x-5 p-5 pb-50 max-[561px]:gap-x-3' initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
                {
                    galleryImages.map((image, index) => (
                        <GalleryImage key={index} src={image.src} caption={image.caption} />
                    ))
                }
            </motion.div>
        </div>
    )
}

export default DisabilitySupport
