import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminMenu({name , price , description , image}) {
  return (
    <div className='rounded-2xl h-90 bg-white'>
      <img
        className='h-48 w-full object-cover object-top rounded-t-2xl'
        src={image}
        alt={name}
      />
      <div className='p-2 px-5'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-gray-500'>{description}</p>
        <p className='mt-3 font-semibold text-lg'>Price: ₹{price}</p>
        <div className='flex gap-10 justify-center mt-4'>
            <button className='border border-gray-300 cursor-pointer hover:bg-green-500 font-semibold hover:text-white p-2 px-4 rounded-lg '>
                Edit
            </button>
            < button className='p-2 border border-gray-300 bg-red-600 hover:bg-red-500 cursor-pointer px-5 rounded-lg'>
                <RiDeleteBin6Line />
            </button>
        </div>
        
      </div>
    </div>
  )
}

export default AdminMenu