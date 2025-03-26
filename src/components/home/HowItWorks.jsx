import { React } from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hiw from '../../assets/images/hiw1.png'


const HowItWorks = () => {
    // const howItWorksRef = useRef(null);
    // const location = useLocation();

    // useEffect(() => {
    //     if (location.hash === "#howitworks") {
    //         howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, [location]);


    return (
        <section id="howitworks" className="overflow-hidden">
            <motion.div className="how-it-works flex justify-around max-[768px]:flex-col items-center gap-x-7 p-10 py-15 max-[768px]:px-5 bg-[var(--p-color)] my-5 overflow-hidden rounded-4xl" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1 }}>
                <div className="w-[15rem] max-[1081px]:self-start max-[768px]:w-[100%] max-[768px]:mt-0 max-[768px]:mb-10">
                    <img loading="lazy" src={hiw} alt="how it works" className=" h-[100%] rounded-4xl" />
                </div>
                <div className="flex-1 relative">
                    {/* <h2 className="text-center m-0 mb-4 p-0 text-2xl font-semibold text-gray-200">How It Works</h2> */}
                    <div className="hiwis relative grid grid-cols-4 max-[1081px]:grid-cols-2 max-[506px]:grid-cols-1 gap-x-6 max-[506px]:gap-x-0 bg-[var(--bg-color)] w-[100%] rounded-4xl p-3 overflow-hidden">
                        <div className="hiwi-outer p-1">
                            <div className="hiwi"><FontAwesomeIcon icon="user-plus"/></div>
                            <h4>Sign Up | Sign In</h4>
                            <p>Sign up for free to become a member. Already a member? Simply sign in and start exploring! To give away items or find something you need, you need to sign up or sign in by clicking on <b className="text-[var(--p-color)]">Join</b> button.</p>
                            <Link to="/auth">Join</Link>
                        </div>
                        <div className="hiwi-outer max-[506px]:flex flex-col  p-1">
                            <h4 className="order-2">Giving</h4>
                            <p className="order-3">To easily list items for giveaway, click on <b className="text-[var(--p-color)]">Give Item</b> button. Fill out the form and submit it. We will review your items to ensure they comply with our policies before it becomes visible to other users.</p>
                            <Link to="/give-item" className="order-4 mx-auto">Give Item</Link>
                            <div className="hiwi order-1"><FontAwesomeIcon icon="hand-holding"/> <FontAwesomeIcon icon="gifts" className="absolute text-[1.7rem] top-[2.5rem]"/></div>
                        </div>
                        <div className="hiwi-outer p-1">
                            <div className="hiwi"><FontAwesomeIcon icon="hands-holding"/> <FontAwesomeIcon icon="box" className="absolute text-[1.7rem] top-[2.2rem]"/></div>
                            <h4>Collecting</h4>
                            <p>To collect items, simply click on <b className="text-[var(--p-color)]">Giveaways</b> button and browse through the list of available items. Remember to collect only the item you truly need, as you can only collect one item per day.</p>
                            <Link to="">Giveaways</Link>
                        </div>
                        <div className="hiwi-outer p-1 max-[506px]:flex flex-col">
                            <h4 className="order-2">Community</h4>
                            <p className="order-3">Wanting to learn something new, exchange ideas, or simply have fun, our vibrant and diverse community offers a welcoming space for everyone to interact, grow, and build lasting connections.</p>
                            <Link className="order-4 mx-auto">Community</Link>
                            <div className="hiwi order-1"><FontAwesomeIcon icon="users"/></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default HowItWorks


