import React from 'react';
import useAuth from '../../hooks/useAuth';
import { CiLogin } from "react-icons/ci";
import logo from '/carts.png'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
const Navbar = () => {
    const { user, logout } = useAuth()
    const handleLogout = () => {
        logout()
    }

    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>All Products</Link></li>
        <li><Link to='/'>About Us</Link></li>
        <li><Link to='/'>Contact Us</Link></li>
    </>
    return (
        <div className="navbar bg-base-100 border-b">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <button className="btn btn-ghost text-xl">
                    <img src={logo} alt="shopping-cart" className='md:w-8 w-4' />
                    EG Mart</button>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <button onClick={handleLogout} className="btn btn-outline p-1 rounded-lg">
                    Log Out <CiLogin className='text-2xl text-yellow-100' />
                </button> : <Link to='/login'><button className="btn btn-outline p-1 rounded-lg">Log in <CiLogin className='text-2xl text-yellow-100' /></button></Link>
                    
                }
                
            </div>
        </div>
    );
};

export default Navbar;