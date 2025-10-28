import React from 'react'
import { IoLockClosedOutline } from "react-icons/io5";
function Menu() {
  return (
    <div className='bg-gray-50 w-full md:p-10 p-5 pt-10 md:px-20 relative'>
        <button className='absolute top-5 right-5 md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg'>
           <IoLockClosedOutline /> Admin
        </button>
        <div>
            <h1 className='text-4xl font-bold mb-2'>Our Menu</h1>
            <p className='text-gray-500'>Fresh and delicious items made with love</p>
        </div>
    </div>
  )
}

export default Menu