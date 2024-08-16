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
        <div className='w-full md:w-2/3 mx-auto p-2'>

        </div>
    );
};

export default Register;