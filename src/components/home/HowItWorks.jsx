import { React } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import hiw from '../../assets/images/hiw1.png'


// const steps = [
//     {
//         id: 1,
//         title: "Join | Login",
//         description: "Sign up for free and become part of our trusted community. Whether you’re looking to give away items or find something you need, joining unlocks access to thousands of free listings. Already a member? Simply log in and start exploring!",
//         icon: <FontAwesomeIcon icon="user-plus" className="text-4xl text-primary" />,
//     },
//     {
//         id: 2,
//         title: "Give | Collect",
//         description: "Easily list items you no longer need and give them a new home. Looking for something useful? Browse through available items and claim what you need; all for free! Make generosity a part of your daily life and help build a sharing community.",
//         icon: <FontAwesomeIcon icon="gift" className="text-4xl text-primary" />,
//     },
    
//   {
//     id: 3,
//     title: "Connect & Exchange",
//     description: "Chat securely and arrange your free exchange.",
//     icon: <FontAwesomeIcon icon="hand-shake" className="text-4xl text-primary" />,
//   },
// ];

const HowItWorks = () => {
    return (
        <section className="overflow-hidden">
            <motion.div className="how-it-works flex gap-x-7 align-start p-10 bg-gray-400 my-5 overflow-hidden" initial={{ opacity: 0, y: 200 }}  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 1, delay: 0.1 }}>
                <div className="my-auto">
                    <img loading="lazy" src={hiw} alt="how it works" className="w-[20rem] max-[1081px]:w-[15rem] rounded-4xl" />
                </div>
                <div className="w-[100%]">
                    <h2 className="text-center m-0 mb-2 p-0 text-2xl font-semibold text-white">How It works</h2>
                    <div className="hiwis flex max-[993px]:flex-col gap-x-6 bg-white w-[100%] rounded-4xl p-3 overflow-hidden">
                        <div className="hiwi-outer max-[993px]:grow-6 flex-wrap flex-1 p-1">
                            <div className="hiwi"><FontAwesomeIcon icon="user-plus"/></div>
                            <p><b>Join | Login</b><br/>Sign up for free to become a member. Already a member? Simply login and start exploring! To give away items or find something you need, you need to sign up or login by clicking on <b className="text-[var(--p-color)]">Join</b> button.</p>
                        </div>
                        <div className="hiwi-outer max-[993px]:grow-6 flex-1 p-1">
                            <p><b>Giving</b><br/>To easily list items you no longer need, click on <b className="text-[var(--p-color)]">Give Item</b> button. Fill the form correctly and submit. We will review your post to ensure it complies with our policies before it will be visible to other users.</p>
                            <div className="hiwi"><FontAwesomeIcon icon="hand-holding"/> <FontAwesomeIcon icon="gifts" className="absolute min-[1081px]:top-[1.8rem] max-[1200px]:top-[1.8rem] min-[1081px]:text-[1.4rem] max-[1200px]:text-[1.4rem] text-[1.7rem] top-[0] min-[1201px]:top-[2.5rem]"/></div>
                        </div>
                        <div className="hiwi-outer max-[993px]:grow-6 flex-1 p-1">
                            <div className="hiwi"><FontAwesomeIcon icon="hands-holding"/> <FontAwesomeIcon icon="box" className="absolute min-[1081px]:top-[1.8rem] max-[1200px]:top-[1.8rem] min-[1081px]:text-[1.4rem] max-[1200px]:text-[1.4rem] text-[1.7rem] top-[80px] min-[1201px]:top-[2.5rem]"/></div>
                            <p><b>Collecting</b><br/>To collect items, simply click on <b className="text-[var(--p-color)]">Browse Items</b> button and browse through the list of available items. Remember to collect only the item you truly need, as you can only collect one item per day.</p>
                        </div>
                        <div className="hiwi-outer max-[993px]:grow-6 flex-1 p-1">
                            <p><b>Community</b><br/>Wanting to learn something new, exchange ideas, or simply have fun, our vibrant and diverse community offers a welcoming space for everyone to interact, grow, and build lasting connections.</p>
                            <div className="hiwi"><FontAwesomeIcon icon="users"/></div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default HowItWorks


