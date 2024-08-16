import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const {signInUser, googleLogin, facebookLogin, setLoading} = useAuth()
    const navigate = useNavigate();
    const from = '/';

    const { handleSubmit, register, formState: { errors } } = useForm();

    //   email login
  const onSubmit = (data) => {
    const { email, password } = data
    signInUser(email, password)
        .then(result => {
            // console.log(result.user);
            const newUser = result.user
            if(newUser){
              navigate(from)
              toast.success('Logged In Successfully!')
            }
        })
        .catch(error => {
            console.error(error)
        })
}

    // handle google sign in
  const handleGoogleLogin = async () => {
    try{
      await googleLogin()
      navigate('/')
      toast.success('Logged In Successfully!')
      setLoading(false)
    }catch(err){
      console.log(err);
    }
  }
    return (
        <div className='w-full md:2/3 mx-auto'>
            {/* google & fb button */}
            <div className="">
                <button onClick={handleGoogleLogin} className="flex items-center gap-2 px-12 py-3 rounded-lg shadow-lg bg-gradient-to-r from-[#E4E4E4] to-[white]">
                    <FcGoogle /> Google
                </button>
            </div>
            {/* divider */}
            <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-[#5C635A]">Or Continue with Email</span>
            <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} >
              {/* email field */}
              <div className="space-y-4 my-6">
              <label className="font-medium">Email</label>
            <input {...register("email", { required: true })} 
            type="email" 
            placeholder="Enter your email" 
            className="border w-full rounded-lg px-3 py-4" />
            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              {/* password field */}
              <div className="space-y-4 my-6">
              <label className="font-medium">Password</label>
            <input {...register("password", { required: true })} 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Enter your password" 
            className="border w-full rounded-lg px-3 py-4" />
            {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              {/* submit btn */}
              <div className="w-2/3 mx-auto mt-6 mb-2">
                <button type="submit" className="bg-blue-500 w-full rounded-lg px-3 py-4 text-white mb-3" >Sign in</button>
                <p>Don’t Have an Account? <Link to='/register' className="text-blue-500 underline font-medium">Create Account</Link></p>
              </div>
            </form>
        </div>
    );
};

export default Login;