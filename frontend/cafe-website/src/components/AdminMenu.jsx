import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminMenu({ name, price, description, image, onEdit, onDelete }) {
  return (
    <div className='rounded-xl h-90 bg-white shadow-xl hover:shadow-2xl transition'>
      <img
        className='h-55 w-full object-cover object-center rounded-t-2xl'
        src={image}
        alt={name}
      />
      <div className='p-0.5 px-3'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm text-gray-500 line-clamp-2'>{description}</p>
        <p className='mt-1 font-semibold text-lg'>Price: ₹{price}</p>

        <div className='flex gap-5 justify-center mt-1.5'>
          <button
            onClick={onEdit}
            className='border border-gray-300 cursor-pointer hover:bg-green-500 font-semibold hover:text-white p-2 w-full rounded-lg transition'
          >
            Edit
          </button>

         
          <button
            onClick={onDelete}
            className='p-2 border flex justify-center items-center border-gray-300 bg-red-600 w-full hover:bg-red-500 cursor-pointer rounded-lg transition'
          >
            <RiDeleteBin6Line className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
