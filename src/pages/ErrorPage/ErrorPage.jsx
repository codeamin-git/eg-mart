import React from 'react';
import ErrorLogo from '/error.png'
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const nagigate = useNavigate()
    const from = '/'
    return (
        <div className='w-full flex flex-col justify-center items-center text-center space-y-3'>
            <h1 className='text-5xl font-bold'>Oops<span className='text-red-500'>!!</span></h1>
            <p className='text-3xl'>Something went wrong...</p>
            <img src={ErrorLogo} alt="" />
            <Link to='/'>
            <button className='btn btn-outline rounded-lg'>Back to home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;