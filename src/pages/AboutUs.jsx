import React from "react";
import { Link } from 'react-router-dom'
import '../assets/styles/about.css'

const AboutUs = () => {
    return (
        <main className="mx-auto p-10 pb-20 rounded-lg translate-y-[6rem] max-[941px]:p-5">
            <section className="about-hero text-center py-15 px-5 text-white rounded-lg shadow-lg">
                <div className="about-hero-inner inline-block p-15 max-[451px]:px-5 rounded-4xl">
                    <h1 className="text-4xl font-bold" style={{ color:'#eee' }}>Empowering Generosity, Changing Lives</h1>
                    <p className="mt-4 text-xl">Join us in creating a world where giving is effortless and impactful.</p>
                    <Link to="" className="inline-block mt-6 px-6 py-3 mx-auto bg-[#fff] text-[var(--p-color)] font-semibold rounded-lg shadow-md hover:bg-[#ccc] hover:text-[var(--p-color)]" to="join">
                        Join Us Today
                    </Link>
                </div>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold">Who We Are</h2>
                <p className="mt-2 text-gray-700 text-lg max-w-3xl mx-auto">
                    We are a pioneering giveaway platform committed to fostering a culture of generosity by connecting donors
                    with recipients. Our goal is to create a thriving community where individuals and organizations can
                    share resources freely, ensuring that valuable items, services, and financial support reach those who
                    need them the most.
                </p>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold">Our Mission & Vision</h2>
                <p className="mt-2 text-gray-700 text-lg max-w-3xl mx-auto">
                    Our mission is to make generosity easy and accessible for everyone. We envision a global community where
                    giving is a natural and everyday practice, creating a world of kindness, sustainability, and shared
                    opportunities.
                </p>
            </section>

            <section className="mt-12 text-center">
                <h2 className="text-3xl font-semibold">Community Impact</h2>
                <p className="mt-2 text-gray-700 text-lg max-w-3xl mx-auto">
                    We aim at helping people receive the essentials they need while reducing waste and promoting
                    sustainability. Be part of the change today!
                </p>
            </section>
        </main>
    );
};

export default AboutUs;
