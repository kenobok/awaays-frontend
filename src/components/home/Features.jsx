import { React } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import gift from '../../assets/images/gift.png'
import chat from '../../assets/images/chat.png'
import community from '../../assets/images/community.png'

const featureVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut", bounce: 0.4 }
    }
};

const Features = () => {
    return (
        <section className="features px-5 py-10 pt-15 overflow-hidden">
            <div className="flex justify-evenly flex-wrap gap-x-5 gap-y-10 py-10 px-5 overflow-hidden">
                {[
                    { icon: gift, title: "Give & Receive for Free", text: "Share what you don’t need; collect what you need for free, just kindness through. A platform where generosity flows. Helping each other, everyone grows." },
                    { icon: community, title: "Trusted Community", text: "Join a network of kind-hearted people. Built on honesty, trust, and care. More than just a platform, we’re here to unite. A place to grow, a caring community." },
                    { icon: chat, title: "Secure Messaging", text: "Talk with confidence, your privacy stays. No scams, no spam, just safe relays. Connect with others without a doubt. Connect with confidence whenever you can." },
                ].map((feature, index) => (

                    <motion.div key={index} className="single-feature w-[20rem] bg-white p-6 max-[900px]:px-4 rounded-2xl text-center cursor-pointer transition-all overflow-hidden" initial={{ opacity: 0, y: 200 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.1 }} whileHover={{ scale: 1.02 }}>
                        <motion.div className="mb-5 py-1 w-[100%]" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                            <img src={feature.icon} className="w-[80%] m-auto rounded-2xl" alt='icon'/>
                        </motion.div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="mt-1 leading-5 md:leading-[1.4rem]">{feature.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;

