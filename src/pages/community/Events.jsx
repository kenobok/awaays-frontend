import { useState } from "react";
import { motion } from 'framer-motion'
import { events } from '/src/components/utils/UtilsData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '/src/assets/styles/community.css'


const Events = () => {
    const [activeOverlayIndex, setActiveOverlayIndex] = useState(null);

    const handleOverlay = (index) => {
        setActiveOverlayIndex(prev => prev === index ? null : index); 
    };


    return (
        <motion.main className="mx-auto p-10 mt-[5rem] max-[941px]:px-5 pb-25" initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <section className="event-hero text-center text-white rounded-3xl">
                <div className="event-hero-inner w-full h-full p-30 py-60 max-[993px]:py-20 max-[768px]:px-5 rounded-3xl">
                    {/* <h1 className="text-4xl font-bold" style={{ color:'#eee' }}>Our Events</h1>
                    <p className="mt-2 text-xl leading-[1.4rem]">Explore community-powered events that inspire giving, sharing, and meaningful connections across our platform.</p> */}
                </div>
            </section>

            <section className="mt-15 max-w-4xl mx-auto">
                { events.length === 0 ?
                    <div className="justify-center align-center text-center">
                        <p className="text-[1.4rem] font-semibold">No upcoming event(s)</p>
                        <FontAwesomeIcon icon='smile-wink' className="text-[3rem] mt-3 text-blue-600" />
                    </div>
                    :
                    <div className="grid grid-cols-2 pb-10 overflow-hidden max-[577px]:grid-cols-1 gap-7">
                        {
                            events.map((event, index) => (
                                <div key={index} className="relative shadow-lg rounded-xl cursor-pointer overflow-hidden" onClick={() => handleOverlay(index)}>
                                    <img src={event.image} alt='Event image' className='w-full h-[20rem] object-cover rounded-xl'/>
                                    <div className='p-3'>
                                        <h3 className='truncate font-bold text-[1.05rem] leading-[1.2rem]'>{event.title}</h3>
                                        <p className='truncate leading-[1.3rem]'>{event.description}</p>
                                        {event.location && <address className='truncate leading-[1.3rem]'>{event.location}</address>}
                                        {event.date && <p className='truncate leading-[1.3rem] font-semibold'>{event.date} &nbsp;&nbsp; {event.time}</p>}
                                    </div>
                                    { activeOverlayIndex === index && (
                                        <motion.div className={`event-overlay space-y-4 p-5 text-white text-center flex flex-col justify-center rounded-xl`} initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} viewPort={{once: false}} transition={{ duration: 1 }}>
                                            <h3 className='font-bold text-[1.4rem] leading-[1.6rem]'>{event.title}</h3>
                                            <p className='leading-[1.3rem]'>{event.description}</p>
                                            <div className={`bg-[var(--bg-color)] rounded-full p-2 pt-3 text-[var(--p-color)] ${event.location || event.date || event.time ? '' : 'hidden'}`}>
                                                {event.location && <address className='leading-[1.3rem]'>{event.location}</address>}
                                                {event.date && <p className='font-semibold mt-1'>{event.date} &nbsp;&nbsp; {event.time}</p>}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ))
                        }
                    </div>
                }
            </section>
        </motion.main>
    )
}

export default Events;

