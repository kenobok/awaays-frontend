import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import './App.css';


const App = () => {

    return (
        <Router>
            <Header />
            {/* <Home />
            <Footer /> */}
        </Router>
    )
}

export default App;

