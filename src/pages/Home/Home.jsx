import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Login from '../Login/Login';
import Register from '../Register/Register';


const Home = () => {
    return (
        <div>
            <Navbar />
            <Login />
            <Register />
        </div>
    );
};

export default Home;