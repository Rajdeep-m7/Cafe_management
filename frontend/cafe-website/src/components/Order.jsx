import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BASE_URL = "https://cafe-management-a7uc.onrender.com/api/orders";

function Order({ orders }) {
  const{phone , total_price , order_items ,_id}= orders;
  const [status , setStatus]= useState(Order.status);
  useEffect(() => {
  setStatus(orders.status);
  }, [orders.status]);


  const updateStatus = useMutation({
    mutationFn: async (newStatus) => {
      const res = await axios.put(`${BASE_URL}/${_id}/status`, { status: newStatus });
      return res.data;
    },
    onSuccess: (data) => {
      console.log("✅ Status updated:", data);
    },
    onError: (err) => {
      console.error("❌ Failed to update:", err);
      alert("Failed to update status. Please try again.");
    },
  });

  const handleChange=(e) =>{
    const newStatus = e.target.value;
    setStatus(newStatus);
    updateStatus.mutate(newStatus);
    console.log("status:", newStatus,_id);
  } 


  return (
    <div className="p-5 bg-white rounded-xl shadow-md w-full relative mt-5">
      <select
        value={status}
        onChange={handleChange}
        className="border rounded-lg border-gray-400 p-1 md:p-2 px-3 md:absolute md:top-1 md:right-1"
      >
        <option value="pending">Pending</option>
        <option value="complete">Complete</option>
      </select>
      <h1 className="md:text-2xl font-semibold ">Order #{_id}</h1>
      <div className="flex text-gray-500 text-sm mb-3 mt-2">
        <p >{phone}</p>
        <span className="mx-2"> • </span>
        {new Date(orders.createdAt).toLocaleString()}
      </div>

      <div className="py-2">
        {order_items.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <p className="text-sm md:text-lg">
              {item.item_name} × {item.item_quantity}
            </p>
            <p className="text-sm md:text-lg">₹{item.item_price}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-3 font-semibold border-t">
        <p className="font-semibold text-lg">Total:</p>
        <p>₹{total_price}</p>
      </div>
    </div>
  );
}

export default Order;
