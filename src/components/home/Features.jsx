import { React } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import gift from '../../assets/images/gift.png'
import chat from '../../assets/images/chat.png'
import community from '../../assets/images/community.png'

const Features = () => {
    const features = [
        { 
            icon: gift, 
            title: "Give & Receive for Free", 
            text: "Give freely, receive freely. A platform where generosity and kindness come together for everyone.", 
            link: "/give-item",
        },
        { 
            icon: community, 
            title: "Community Forum", 
            text: "Connect, discuss, and share ideas in a trusted space. A community built to support and inspire each other.", 
            link: "/community/forum",
        },
        { 
            icon: chat, 
            title: "Community Groups", 
            text: "Create or join groups. Share ideas, discuss interests and collaborate with like-minded individuals.", 
            link: "community/groups",
        },
    ]

    return (
        <section className="features px-5 py-10 pt-15 overflow-hidden">
            <div className="flex justify-evenly flex-wrap gap-x-5 gap-y-7 py-10 px-5 overflow-hidden">
                {features.map((feature, index) => (
                    <motion.div key={index} className="single-feature w-[18rem] bg-white p-6 max-[900px]:px-4 rounded-2xl text-center transition-all overflow-hidden" initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} whileHover={{ scale: 1.05 }}>
                        <Link to={feature.link}>
                            <motion.div className="mb-5 py-1 w-[100%]" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                                <img src={feature.icon} className="w-[80%] m-auto rounded-2xl" alt='icon'/>
                            </motion.div>
                            <h3 className="text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-1 leading-5 md:leading-[1.4rem]">{feature.text}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;

