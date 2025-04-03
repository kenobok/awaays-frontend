import { motion } from 'framer-motion'


const HomeEvents = () => {
    return (
        <section className="flex-1 w-full overflow-hidden max-[768px]:mb-15 pb-5">
            <motion.div className="relative flex items-end" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1 }}>
                {/* <h3>Upcoming Events</h3> */}
            </motion.div>
        </section>
    )
}

export default HomeEvents
