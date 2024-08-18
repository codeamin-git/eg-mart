import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Products from './Products';


const Home = () => {
    return (
        <div>
            <Navbar />
            <Products />
            <Login />
            <Register />
        </div>
    );
};

export default Home;