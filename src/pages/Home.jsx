import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features'
import HowItWorks from '../components/home/HowItWorks'
import '../assets/styles/home.css'

const Home = () => {

    return (
        <main className='relative'>
            <Hero />
            <Features />
            <HowItWorks />
        </main>
    );
};

export default Home;
