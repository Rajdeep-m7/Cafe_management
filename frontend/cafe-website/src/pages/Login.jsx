import React, { useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { Navigate, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate()
    const [password , setPaswword] = useState("");
    const handleChange =(e)=>{
        const value=e.target.value;
        setPaswword(value);
    }
    const handleClick=(e)=>{
        e.preventDefault();
        console.log("password: " ,password);
        setPaswword("");
        toast.info("Login successfully!", {
            position: "bottom-center",
            theme: "light",
        });
        setTimeout(()=>{
             navigate('/Admin');
        },1000)
       
    }
  return (
    <div className='bg-gray-50 flex justify-center items-center h-lvh'>
        <div className='p-5 border rounded-xl bg-white border-gray-300 min-w-[300px] md:min-w-[500px] shadow-2xl'>
            <h1 className='text-xl font-bold mb-5'>Admin Login</h1>
            <p className='font-semibold'>Password : </p>
            <input type='password' placeholder='Enter password' value={password} onChange={handleChange} className='mt-1 focus:outline-none focus:ring-2 focus:ring-green-500 p-1 w-full border rounded-lg border-gray-300'/>
            <div className='flex gap-5 justify-center mt-5'>
                <NavLink to="/" className='border w-20 font-semibold hover:text-white hover:bg-green-500 border-gray-300 cursor-pointer flex items-center gap-2 rounded-lg p-2'><GoArrowLeft />Back</NavLink>
                <button onClick={handleClick} className='border w-20 font-semibold text-white border-gray-300 bg-green-500 hover:bg-green-400 cursor-pointer rounded-lg p-2'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Login