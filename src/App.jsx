import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/utils/Header';
import Footer from './components/utils/Footer';
import Home from './pages/Home';
import './App.css';


const App = () => {

    return (
        <Router>
            <Header />
            <Home />
            <Footer />
        </Router>
    )
}

export default App;

