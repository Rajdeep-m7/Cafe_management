import React from 'react';
import { toast } from "react-toastify";

function MenuCard({ image, name, description, price, onAddToCart }) {
    const handleAdd = () => {
    onAddToCart({ name, price });
    toast.info(`${name} added to cart! 🛒`, {
        position: "bottom-center",
        theme: "light",
        });
  };
  return (
    <div className='rounded-xl h-90 bg-white shadow-xl hover:shadow-2xl'>
      <img
        className='h-55 w-full object-cover object-center rounded-t-2xl border-b'
        src={image}
        alt={name}
      />
      <div className='pt-0.5 px-3'>
        <h1 className='text-xl font-semibold'>{name}</h1>
        <p className='text-sm text-gray-500'>{description}</p>
        <p className='mt-1 font-semibold text-lg'>Price: ₹{price}</p>

        <button
          onClick={handleAdd}
          className='mt-1.5 px-3 justify-center rounded-lg p-2 w-full font-semibold text-white bg-green-500 hover:bg-green-400'
        >
          + Add to cart
        </button>
      </div>
    </div>
  );
}

export default MenuCard;
