import React, { useState } from "react";

function Order({ order_id, number, date, time, items, total_price }) {
  const [status , setStatus]= useState("Pending");
  const handleChange=(e) =>{
    const newStatus = e.target.value;
    setStatus(newStatus);
    console.log("status:", newStatus);
  } 
  return (
    <div className="p-5 bg-white rounded-xl shadow-md w-full relative">
      <select
        value={status}
        onChange={handleChange}
        className="border rounded-lg border-gray-400 p-1 md:p-2 px-3 md:absolute md:top-1 md:right-1"
      >
        <option value="Pending">Pending</option>
        <option value="Complete">Complete</option>
      </select>
      <h1 className="text-2xl font-semibold ">Order #{order_id}</h1>
      <div className="flex text-gray-500 text-sm mb-3">
        <p>{number}</p>
        <span>•</span>
        <p>{date}</p>
        <span>•</span>
        <p>{time}</p>
      </div>

      <div className="py-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between py-1">
            <p>
              {item.name} × {item.quantity}
            </p>
            <p>₹{item.price}</p>
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
