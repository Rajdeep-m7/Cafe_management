import React, { useState } from 'react'
import { NavLink } from 'react-router'
import { GoArrowLeft } from "react-icons/go";
import Order from '../Components/Order';
import AdminMenu from '../Components/AdminMenu';

function Admin() {
  const [activeItem , setItem] = useState("Orders");
  return (
    <div className='bg-gray-50 p-5 md:p-10 md:px-20 h-full'>
      <div>
        <h1 className=' text-3xl md:text-4xl font-bold mb-5 '>Admin dashboard</h1>
        <div>
          <NavLink to="/" className=' cursor-pointer w-fit border-gray-300 bg-white md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg'>
            <GoArrowLeft /> Back to Home
          </NavLink>
        </div>
      </div>
      <div className="flex gap-3 mt-5 bg-gray-200 p-1 w-fit rounded-lg font-semibold mb-5">
      <button
        onClick={() => setItem("Orders")}
        className={`px-4 py-2  rounded-lg transition-colors border-gray-400
          ${activeItem === "Orders"
            ? "bg-white text-black"
            : "bg-transparent"
          }`}
      >
        Orders
      </button>

      <button
        onClick={() => setItem("Menu")}
        className={`px-4 py-2 rounded-lg transition-colors border-gray-400
          ${activeItem === "Menu"
            ? "bg-white text-black"
            : "bg-transparent"
          }`}
      >
        Menu Management
      </button>
    </div>
    {activeItem == "Orders" ? (
      <Order
      order_id={123456789}
      number={9832349168}
      date="12/3/25"
      time="12:05"
      items={[
        {
          name: "Coffee",
          quantity: 2,
          price: 240,
        },
        {
          name: "Coffee",
          quantity: 2,
          price: 240,
        },
      ]}
      total_price={240}
    />
    ):(
      <div>
        <button className='border border-gray-300 cursor-pointer hover:bg-green-500 bg-green-600 font-semibold text-white p-2 px-4 rounded-lg '>
          + Add new Item
        </button>
      <div className='mt-6 grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'>
        <AdminMenu image="https://imgs.search.brave.com/13UAA4U_ENsGwDLtFZZ0W2sxnGFhCXSVMWXwg7S8bDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS85/MWUyNDFfMmQwOWYx/NzUxZWE2NGVlZDkx/ZGZlOGQ5NGU1MjE5/NTh-bXYyLnBuZy92/MS9maWxsL3dfNTc2/LGhfNDE3LGFsX2Ms/bGdfMSxxXzg1LGVu/Y19hdmlmLHF1YWxp/dHlfYXV0by9idXJn/ZXItcmVtb3ZlYmct/cHJldmlldy5wbmc"
          name="Burger"
          description="Juicy grilled burger"
          price={120} />
          <AdminMenu image="https://imgs.search.brave.com/13UAA4U_ENsGwDLtFZZ0W2sxnGFhCXSVMWXwg7S8bDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS85/MWUyNDFfMmQwOWYx/NzUxZWE2NGVlZDkx/ZGZlOGQ5NGU1MjE5/NTh-bXYyLnBuZy92/MS9maWxsL3dfNTc2/LGhfNDE3LGFsX2Ms/bGdfMSxxXzg1LGVu/Y19hdmlmLHF1YWxp/dHlfYXV0by9idXJn/ZXItcmVtb3ZlYmct/cHJldmlldy5wbmc"
          name="Burger"
          description="Juicy grilled burger"
          price={120} />
          <AdminMenu image="https://imgs.search.brave.com/13UAA4U_ENsGwDLtFZZ0W2sxnGFhCXSVMWXwg7S8bDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS85/MWUyNDFfMmQwOWYx/NzUxZWE2NGVlZDkx/ZGZlOGQ5NGU1MjE5/NTh-bXYyLnBuZy92/MS9maWxsL3dfNTc2/LGhfNDE3LGFsX2Ms/bGdfMSxxXzg1LGVu/Y19hdmlmLHF1YWxp/dHlfYXV0by9idXJn/ZXItcmVtb3ZlYmct/cHJldmlldy5wbmc"
          name="Burger"
          description="Juicy grilled burger"
          price={120} />
          <AdminMenu image="https://imgs.search.brave.com/13UAA4U_ENsGwDLtFZZ0W2sxnGFhCXSVMWXwg7S8bDQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2l4c3RhdGlj/LmNvbS9tZWRpYS85/MWUyNDFfMmQwOWYx/NzUxZWE2NGVlZDkx/ZGZlOGQ5NGU1MjE5/NTh-bXYyLnBuZy92/MS9maWxsL3dfNTc2/LGhfNDE3LGFsX2Ms/bGdfMSxxXzg1LGVu/Y19hdmlmLHF1YWxp/dHlfYXV0by9idXJn/ZXItcmVtb3ZlYmct/cHJldmlldy5wbmc"
          name="Burger"
          description="Juicy grilled burger"
          price={120} />
      </div>
      </div>
    )}
    
    </div>
  )
}

export default Admin