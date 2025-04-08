import { motion } from 'framer-motion';


const GalleryImage = ({key, src, caption}) => {

    return (
        <motion.div key={key} className='w-15rem shadow-lg rounded-lg' initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
            <img src={src} alt={`image`} className='w-full object-cover cursor-zoom-in rounded-lg' />
            <p className='w-full text-[.9rem] leading-[1rem] p-2'>{caption=caption}</p>
        </motion.div>
    )
}


export { GalleryImage }
