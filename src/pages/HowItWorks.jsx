import { useState } from "react";
import { Link } from 'react-router-dom'
import '../assets/styles/about.css'


const HowItWorks = () => {

    return (
        <main className="hiw-wrp mx-auto p-10 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5">
            <section className="howitworks-hero text-center text-white rounded-3xl">
                <div className="howitworks-hero-inner w-full h-full p-40 max-[993px]:py-20 max-[768px]:px-5 rounded-3xl">
                    <h1 className="text-4xl font-bold" style={{ color:'#eee' }}>HOW IT WORKS</h1>
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
                        <li>To create an account, click on <b className="text-[var(--p-color)]">Join</b> and sign up by filling the form (or Sign Up using Google/Apple).</li>
                        <li>A verification link will be sent to your email.</li>
                        <li>Click the link to activate your account and gain full access.</li>
                    </ul>
                </div>
                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-semibold">Existing Users – Sign In</h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>If you already have an account, simply click on <b className="text-[var(--p-color)]">Join</b> and sign in with your registered email and password. (or Sign In using Google/Apple).</li>
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
                            <b>Select Giving Purpose:</b> Choose the reason for giving—whether to help those in the hospital, prison, people with disabilities or for any other purpose.
                        </li>
                        <li>
                            <b>Item Name:</b> Enter the name of the item you’re giving away (e.g., Clothes, Carton of Noodles, Chairs, ₦10,000, Generator, etc.).
                        </li>
                        <li>
                            <b>Description:</b> Provide a detailed description of the item, including its condition, size, or any important details.
                        </li>
                        <li>
                            <b>Instructions:</b> Specify any additional instructions, such as pickup details or conditions for receiving the item.
                        </li>
                        <li>
                            <b>Images:</b> Upload at least one clear image of the item (maximum of five images allowed).
                        </li>
                    </ul>
                </div>
            </section>

            <section className="mt-15 max-w-3xl mx-auto">
                <div className="text-left">
                    <h2 className="text-3xl text-center font-semibold">Collect an Item for Free</h2>
                    <p className="mt-2 text-lg">
                        Need something? Browse available giveaways and request an item in just a few simple steps.
                    </p>
                </div>

                <div className="hiw-ul-li mt-3">
                    <h4 className="text-xl font-normal">
                        Follow these steps to request and collect an item:
                    </h4>
                    <ul className="pl-5 mt-2 space-y-2">
                        <li>
                            <b>Browse or Search:</b> Explore available giveaways by clicking on <b className="text-[var(--p-color)]">Giveaways</b> or use the search bar to find specific items.
                        </li>
                        <li>
                            <b>Request an Item:</b> Click on the item you want and submit a request. Some givers may ask why you need the item before approval.
                        </li>
                        <li>
                            <b>Wait for Approval:</b> If the giver approves your request, you’ll receive a notification and can proceed with collection.
                        </li>
                        <li>
                            <b>Connect with the Giver:</b> Use the chat feature to arrange pickup or discuss any necessary details.
                        </li>
                        <li>
                            <b>Pick Up the Item:</b> Meet the giver at the agreed location and collect your item. Be punctual and polite!
                        </li>
                        <li>
                            <b>Confirm & Leave a Review:</b> After receiving the item, mark it as "Received" on the platform and leave a review to help build trust in the community.
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
        </main>
    )
}

export default HowItWorks;