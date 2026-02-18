import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";

function AdminMenu({ name, price, description, image, onEdit, onDelete }) {
  return (
    <div className='rounded-2xl h-95 bg-white shadow-xl hover:shadow-2xl transition'>
      <img
        className='h-55 w-full object-cover object-center rounded-t-2xl'
        src={image}
        alt={name}
      />
      <div className='p-2 px-5'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm text-gray-500 line-clamp-2'>{description}</p>
        <p className='mt-2 font-semibold text-lg'>Price: ₹{price}</p>

        <div className='flex gap-10 justify-center mt-4'>
          <button
            onClick={onEdit}
            className='border border-gray-300 cursor-pointer hover:bg-green-500 font-semibold hover:text-white p-2 px-4 rounded-lg transition'
          >
            Edit
          </button>

         
          <button
            onClick={onDelete}
            className='p-2 border border-gray-300 bg-red-600 hover:bg-red-500 cursor-pointer px-5 rounded-lg transition'
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
