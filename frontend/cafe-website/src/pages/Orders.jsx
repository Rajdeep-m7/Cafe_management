import React, { useState } from "react";
import OrderByPhone from "@/components/OrderByPhone";

function Orders() {
  const [phone, setPhone] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState(""); // ✅ holds phone for search
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setError("");
    setSubmittedPhone(phone);
  };

  return (
    <div className="md:p-10 p-5 md:px-20 bg-gray-50 min-h-lvh">
      <div>
        <h1 className="md:text-4xl text-3xl md:text-left text-center font-bold">
          Track Your Order
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 border bg-white border-gray-300 rounded-xl p-5"
      >
        <h1 className="text-xl font-semibold">Enter Phone Number</h1>
        <p className="text-gray-600">
          Enter the phone number used when placing your order
        </p>

        <div className="flex flex-col md:flex-row gap-2 mt-4">
          <input
            type="tel"
            placeholder="Enter Number"
            name="Search"
            value={phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-2 bg-green-500 hover:bg-green-400 whitespace-nowrap rounded-lg text-white font-semibold"
          >
            Search Orders
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>
      
      {submittedPhone && <OrderByPhone phone={submittedPhone} />}
    </div>
  );
}

export default Orders;
