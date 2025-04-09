import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCards, Mousewheel } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

const testimonies = [
    {
        name: "John Doe",
        testimony: "I never thought I could receive such amazing items for free! This platform has truly changed my life.",
        location: "Lagos, Nigeria"
    },
    {
        name: "Alice Johnson",
        testimony: "Giving away unused items to those who need them has never been easier. I'm so happy to be part of this community!",
        location: "New York, USA"
    },
    {
        name: "Michael Brown",
        testimony: "I got a laptop that helped me continue my studies. This website is a blessing!",
        location: "Accra, Ghana"
    },
    {
        name: "Sophia Martinez",
        testimony: "I love the transparency and ease of use. Donating and receiving items is seamless!",
        location: "London, UK"
    },
    {
        name: "James Wilson",
        testimony: "I was able to furnish my new apartment with items from generous donors. Thank you so much!",
        location: "Toronto, Canada"
    },
    {
        name: "Emily Davis",
        testimony: "This giveaway platform is life-changing. I was able to donate clothes and help many people in need!",
        location: "Johannesburg, South Africa"
    },
    {
        name: "William Anderson",
        testimony: "I gave away my old gadgets and saw them bring joy to others. Best decision ever!",
        location: "Sydney, Australia"
    },
    {
        name: "Olivia Thomas",
        testimony: "The community is so supportive. I received a stroller for my newborn, and I couldn't be more grateful!",
        location: "Nairobi, Kenya"
    },
    {
        name: "Ethan White",
        testimony: "This platform is a true example of kindness and generosity. I got a bicycle that helps me commute daily!",
        location: "Berlin, Germany"
    },
    {
        name: "David Lee",
        testimony: "The process is so simple, and the impact is huge. I'm proud to be part of this giving community!",
        location: "Dubai, UAE"
    }
];


const Testimonial = () => {


    return (
        <section className="flex-1 w-full overflow-hidden max-[768px]:mb-15 pb-5">
            <motion.div className="home-testimonial relative flex items-end max-[768px]:min-h-[400px]" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }}>
                <div className="absolute text-center p-7 top-5 left-[50%] transform -translate-x-[50%] rounded-full bg-[rgba(255,255,255,.6)]">
                    <h5 className="font-bold text-[1.7rem]" >Testimonials</h5>
                    <Link to="" className="inline-block px-2 pt-[2px] mt-1 text-[var(--p-color)] border border-2 border-[var(--p-color)] rounded-full">See more</Link>
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectCards, Mousewheel]}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{delay: 3000, disableOnInteraction: false,}}
                    // effect={'cards'}
                    mousewheel={true}
                    className="testimonial-slide bg-[var(--bg-color)] rounded-2xl w-[80%] max-[501px]:w-[90%] shadow-lg"
                >
                { testimonies.length>0 ?
                    testimonies.slice(0, 5).map((testimony, index) => (
                        <SwiperSlide key={index} className="p-7 pb-10 max-[500px]:px-5 max-[500px]:pt-5">
                            <p className="leading-[1.2rem]">{testimony.testimony}</p>
                            <div className="flex mt-2">
                                <h4 className="font-bold leading-[1.2rem]">{testimony.name}</h4> 
                                <b className="mx-2 leading-[1.2rem]">|</b> 
                                <address className="leading-[1.2rem]">{testimony.location}</address>
                            </div>
                        </SwiperSlide>
                    ))
                    :
                    <p>No testimonies available</p>
                }
                    
                </Swiper>
            </motion.div>
        </section>         
    )
}


export default Testimonial
