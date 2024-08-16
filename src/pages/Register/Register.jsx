import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const { createUser } = useAuth();
    const navigate = useNavigate();
    const from = '/';

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const { email, password } = data
        createUser(email, password)
            .then(result => {
                console.log(result.user);
                const newUser = result.user
                if(newUser){
                  navigate(from)
                  toast.success('Signed Up Successfully!')
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='w-full md:w-2/3 mx-auto p-2 flex flex-col justify-center min-h-screen'>
            <h2 className='text-3xl text-center mb-4'>Register now! to buy our products</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
              {/* name field */}
              <div className="space-y-4">
              <label className="font-medium">Name</label>
            <input {...register("name", { required: true })} 
            placeholder="@username" 
            className="border w-full rounded-lg px-3 py-4" />
            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
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
              <div className="relative space-y-4 my-6">
              <label className="font-medium">Password</label>
            <input {...register("password", { required: true })} 
            type='password'
            placeholder="Enter your password" 
            className="border w-full rounded-lg px-3 py-4" />
            {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
              </div>
              {/* submit btn */}
              <div className="w-2/3 mx-auto mt-6 mb-2">
                <button type="submit" className="bg-blue-500 w-full rounded-lg px-3 py-4 text-white mb-3" >Sign up</button>
                <p>Already Have an Account? <Link to='/login' className="text-blue-500 underline font-medium">Log in</Link></p>
              </div>
            </form>
        </div>
    );
};

export default Register;