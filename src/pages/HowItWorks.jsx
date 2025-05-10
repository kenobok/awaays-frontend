import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../assets/styles/about.css'


const HowItWorks = () => {

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []);

    return (
        <motion.main className="hiw-wrp mx-auto p-10 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5" initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
            <section className="howitworks-hero text-center text-white rounded-3xl">
                <div className="howitworks-hero-inner w-full h-full p-40 max-[993px]:py-20 max-[768px]:px-5 rounded-3xl">
                    <h1 className="text-4xl font-bold" style={{ color: '#eee' }}>HOW IT WORKS</h1>
                    <p className="mt-4 text-xl">Our platform is built to connect people who want to give away free items to those who need them. Our community makes sharing easy, safe, and rewarding.</p>
                </div>
            </section>

            <section className="mt-15 max-w-3xl mx-auto">
                <div className="text-left">
                    <h2 className="text-3xl text-center font-semibold">Sign Up | Sign In</h2>
                    <p className="mt-2 text-lg ">
                        To access all the features on our platform, it is mandatory to create and verify your
                        account using your email address. This helps ensure a safe and trustworthy community by
                        preventing spam and unauthorized activity.
                    </p>
                </div>
                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-semibold">New Users – Sign Up & Verification</h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>To create an account, click on <b className="text-[var(--p-color)]">Join</b> and sign up by filling the form (or Sign Up using Google).</li>
                        <li>A verification code will be sent to your email.</li>
                        <li>Use the code to verify your email in other and gain full access.</li>
                    </ul>
                </div>
                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-semibold">Existing Users – Sign In</h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>If you already have an account, simply click on <b className="text-[var(--p-color)]">Join</b> and sign in with your registered email and password. (or Sign In using Google).</li>
                        <li>Forgot your password? Use the reset password option to recover your account.</li>
                    </ul>
                </div>
            </section>

            <section className="mt-15 max-w-3xl mx-auto">
                <div className="text-left">
                    <h2 className="text-3xl text-center font-semibold">List an Item for Giveaway</h2>
                    <p className="mt-2 text-lg">
                        Have something you no longer need? Make a difference by giving it away to someone who does!
                        Follow these simple steps to list an item for giveaway:
                    </p>
                </div>

                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-normal">
                        Click on the <b className="text-[var(--p-color)]">Give Item</b> button and fill out the form:
                    </h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>
                            <b>Select Giving Purpose: </b>
                            Choose the reason for your donation—whether it's to support individuals in hospitals, prisons, disability homes, orphanages, or for another specific cause. If you're giving to the general public, select the General Giveaway option. In this case, people can request your item, and you will choose who to give it to.
                            For all other purposes, AWAAYS will handle the process. We will contact you, collect the item, and deliver it to the appropriate recipients based on the purpose you selected.
                        </li>
                        <li>
                            <b id="scroll-to-view">Item Name:</b> Enter the name of the item you’re giving away (e.g., Clothes, Carton of Noodles, Chairs, ₦10,000, Bicycle, Bag of rice, Baby walker,  etc.).
                        </li>
                        <li>
                            <b>Description:</b> Provide a detailed description of the item, including its condition, size, or any important details.
                        </li>
                        <li>
                            <b>Instructions:</b> Specify any additional instructions, such as pickup details or conditions for receiving the item.
                        </li>
                        <li>
                            <b>Images:</b> Upload at least one clear image of the item (maximum of 3 images allowed).
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-15 max-w-3xl mx-auto">
                <div className="text-left">
                    <h2 className="text-3xl text-center font-semibold">Collect an Item for Free</h2>
                    <p className="mt-2 text-lg">
                        Need something? Browse available giveaways and request an item for free.
                    </p>
                </div>

                <div className="hiw-ul-li mt-3">
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>
                            <b>Browse or Search:</b> Explore available giveaways by clicking on <b className="text-[var(--p-color)]">Giveaways</b> or use the search bar to find specific items.
                        </li>
                        <li>
                            <b>Request an Item:</b> Click on the item you’re interested in and read the instructions carefully. Some givers may want to understand why you need the item, so it’s recommended to write a brief but clear note explaining your reason before clicking the Request Item button. <b>NOTE: Only General Giveaway items can be requested for. All other purposes are handled by Awaays.</b> Awaays collect the items and distribute them to Prisons, Hospitals, Orphanages or other purposes selected.
                        </li>
                        <li>
                            <b>Wait for Approval:</b> If the giver approves your request, you’ll receive a notification and can proceed with collection.
                        </li>
                        <li>
                            <b>Connect with the Giver:</b> Use the chat feature to arrange pickup or discuss any necessary details. Some givers may provide their phone number so you can easily contact them for pickup.
                        </li>
                        <li>
                            <b>Pick Up the Item:</b> Meet the giver at the agreed location and collect your item. Be punctual and polite!
                        </li>
                        <li>
                            <b>Confirm Receipt:</b> Once you receive the item, please mark it as "Received" on the platform. Then, head over to the community forum to share a brief testimonial about your experience.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-15 max-w-3xl mx-auto">
                <div className="text-left">
                    <h2 className="text-3xl text-center font-semibold">Join the Community</h2>
                    <p className="mt-2 text-lg">
                        More than just a giveaway platform, we are a community! Connect, interact, and share ideas with like-minded people who believe in giving, helping, and sustainability.
                    </p>
                </div>

                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-normal">
                        Here’s how to engage with the community:
                    </h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>
                            <b>Join Discussions:</b> Participate in conversations about giving, sustainability, and ways to help others.
                        </li>
                        <li>
                            <b>Ask & Answer Questions:</b> Seek advice, ask for recommendations, or offer helpful tips to others in the community.
                        </li>
                        <li>
                            <b>Share Experiences:</b> Post stories or testimonials about successful giveaways and how they impacted your life or someone else’s.
                        </li>
                        <li>
                            <b>Connect with Like-Minded People:</b> Find and interact with individuals who share similar interests in charity, minimalism, and responsible giving.
                        </li>
                        <li>
                            <b>Follow Community Guidelines:</b> Engage respectfully, avoid spam, and contribute meaningfully to discussions.
                        </li>
                        <li>
                            <b>Stay Updated:</b> Receive announcements, new feature updates, and community highlights directly on the platform.
                        </li>
                    </ul>
                </div>
            </section>
        </motion.main>
    )
}

export default HowItWorks;

