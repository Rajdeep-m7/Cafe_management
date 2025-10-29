import React, { useState } from 'react'
import { IoLockClosedOutline } from "react-icons/io5";
import MenuCard from '../components/MenuCard';
import { useCart } from '../context/CartContext';
import { NavLink } from "react-router";
function Menu() {
  const { addToCart } = useCart();
  const Catagory=[
    {id:1 , name:"All"},
    {id:2 , name:"Tea"},
    {id:3 , name:"Coffee"},
    {id:4 , name:"Drinks"},
    {id:5 , name:"Burger"},
    {id:6 , name:"Pizza"},
    {id:7 , name:"Sandwich"},
    {id:8 , name:"Momo"},
    {id:9 , name:"Noodels"},
    {id:10 , name:"Snacks"},
    {id:12 , name:"Veg"},
    {id:13, name:"NonVeg"},
    {id:14, name:"IceCream"},
    ]
    const sampleImage ="https://imgs.search.brave.com/nHaAXisK6y-KJM43LzXXa2FAjQm-oMftQbQWGaf2uKs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNTMz/NDAzL3BleGVscy1w/aG90by01MzM0MDMu/anBlZz9hdXRvPWNv/bXByZXNzJmNzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw"

  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };
  return (
    <div className='bg-gray-50 w-full md:p-10 p-5 pt-10 md:px-20 relative'>
        <NavLink to="/Admin" className=' cursor-pointer absolute top-5 right-5 border-gray-300 bg-white md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg'>
           <IoLockClosedOutline /> Admin
        </NavLink>
        <div>
            <h1 className='text-4xl font-bold mb-2'>Our Menu</h1>
            <p className='text-gray-500'>Fresh and delicious items made with love</p>
        </div>
        <div className="mt-6 overflow-x-auto scrollbar-hide rounded-xl xl:flex xl:justify-center"
         style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}>
          <div className='bg-gray-200 w-fit p-1 rounded-xl flex gap-1'>
          {Catagory.map((cat)=>(
            <button
          key={cat.id}
          onClick={() => handleCategoryClick(cat.id)}
          className={`px-5 py-2 rounded-xl font-semibold transition-all duration-200 ${
            activeCategory === cat.id
              ? "bg-white"
              : " text-gray-700"
          }`}
        >
          {cat.name}
        </button>
          ))}
        </div>
        </div>
        <div className='mt-6 grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'>
          <MenuCard image={sampleImage} name="coffee" description="very good" price="50" onAddToCart={addToCart} />
          <MenuCard
          image={sampleImage}
          name="Burger"
          description="Juicy grilled burger"
          price={120}
          onAddToCart={addToCart}
        />
        <MenuCard
          image={sampleImage}
          name="Burger"
          description="Juicy grilled burger"
          price={120}
          onAddToCart={addToCart}
        />
        <MenuCard
          image={sampleImage}
          name="Burger"
          description="Juicy grilled burger"
          price={120}
          onAddToCart={addToCart}
        />
        <MenuCard
          image={sampleImage}
          name="Burger"
          description="Juicy grilled burger"
          price={120}
          onAddToCart={addToCart}
        />
        </div>
    </div>
  )
}

export default Menu