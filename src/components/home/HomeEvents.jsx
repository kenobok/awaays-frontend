import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { events } from '../utils/UtilsData'


const HomeEvents = () => {
    return (
        <section className="flex-1 w-full overflow-hidden max-[768px]:mb-15 mt-5 pb-5">
            <motion.div className="relative" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1 }}>
                <div className='flex justify-between items-center mb-5 px-5'>
                    <h3 className='font-semibold text-[1.3rem]'>Our Events</h3>
                    <Link to="/community/events" className="inline-block border-2 border-[var(--p-color)] rounded-full p-1 px-3 pt-[5px]">See more</Link>
                </div>
                <div className='grid grid-cols-2 max-[577px]:grid-cols-1 gap-5 w-full'>
                    {
                        events ? events.slice(0, 2).map((event, index) => (
                            <div key={index} className='w-full overflow-hidden rounded-lg shadow-lg'>
                                <img src={event.image} alt='Event image' className='w-full h-[70%] object-cover rounded-xl'/>
                                <div className='p-5 max-[768px]:p-3'>
                                    <h3 className='truncate font-bold text-[1.05rem] leading-[1.2rem]'>{event.title}</h3>
                                    <p className='truncate leading-[1.3rem]'>{event.description}</p>
                                    {event.location && <address className='truncate leading-[1.3rem]'>{event.location}</address>}
                                    {event.date && <p className='truncate leading-[1.3rem] font-semibold'>{event.date} &nbsp;&nbsp; {event.time}</p>}
                                </div>
                            </div>
                        )) : <Loader1 />
                    }
                </div>
            </motion.div>
        </section>
    )
}

export default HomeEvents
