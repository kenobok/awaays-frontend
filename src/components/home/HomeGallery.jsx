import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { galleryImages } from '/src/components/utils/UtilsData';
import { Loader1 } from '/src/components/utils/Preloader'


const HomeGallery = () => {
    return (
        <section className="flex-1 max-[768px]:mb-15 mt-5 pb-5">
            <motion.div className="relative" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1 }}>
                <div className='flex justify-between items-center mb-5 px-5'>
                    <h3 className='font-semibold text-[1.3rem]'>Our Gallery</h3>
                    <Link to="/community/gallery" className="inline-block border-2 border-[var(--p-color)] rounded-full p-1 px-3 pt-[5px]">See more</Link>
                </div>
                <div className='grid grid-cols-3 max-[577px]:grid-cols-2 gap-5 w-full'>
                    {
                        galleryImages ? galleryImages.slice(0, 6).map((image, index) => (
                            <div key={index} className='w-full h-40 overflow-hidden rounded-lg shadow-lg'>
                                <img src={image.src} alt={`Slider ${index}`} className='object-cover w-full h-40'/>
                            </div>
                        )) : <Loader1 />
                    }
                </div>
            </motion.div>
        </section>
    )
}

export default HomeGallery
