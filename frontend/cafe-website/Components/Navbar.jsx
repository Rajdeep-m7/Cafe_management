import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from 'react-router';
function Navbar() {
  return (
    <div className='border-b border-gray-200' >
       <div className='flex justify-between p-3'>
         <NavLink to="/" className='text-3xl text-green-500 font-bold'>
            Nest cafe 
         </NavLink>
         <div className='flex gap-2 md:gap-10 md:mr-5 items-center'>
            <NavLink to="/Orders" className='hover:bg-green-500 rounded p-2 font-semibold'>
                Track Order
            </NavLink>
            <NavLink to="/Cart">
                <FaCartShopping className='h-10 w-10 p-2 hover:bg-green-500 rounded'/>
            </NavLink>
            
         </div>
       </div>
    </div>
  )
}

export default Navbar