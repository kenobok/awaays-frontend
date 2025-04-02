import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import Testimonial from '../components/home/Testimonial';
import HomeLeaderboard from '../components/home/HomeLeaderboard';
import '../assets/styles/home.css';


const Home = () => {

    return (
        <main className='relative'>
            <Hero />
            <Features />
            <div className="flex justify-evenly max-[768px]:block mb-10 py-5 px-10 max-[941px]:px-5 max-[500px]:px-3 gap-x-10 max-[941px]:gap-x-7 w-full">
                <Testimonial />
                <HomeLeaderboard />
            </div>
            <HowItWorks />
        </main>
    );
};

export default Home;
