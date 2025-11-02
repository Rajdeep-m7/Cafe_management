import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Cart({
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice,
  clearCart,
}) {
    const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);
    if (error) setError("");
  };

  

  const handleOrder = async (e) => {
  e.preventDefault();

  if (!phone || phone.length !== 10) {
    setError("Please enter a valid 10-digit phone number.");
    return;
  }

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    const orderData = {
      phone,
      total_price: totalPrice,
      order_items: cartItems.map((item) => ({
        item_name: item.name,
        item_quantity: item.quantity,
        item_price: item.price,
      })),
    };

    const response = await axios.post("https://cafe-management-a7uc.onrender.com/api/addOrder", orderData);

    toast.success("✅ Order placed successfully!", {
      position: "bottom-center",
      theme: "light",
    });

    console.log("🧾 Order saved:", response.data);

    clearCart();
    setPhone("");
    setTimeout(() => navigate("/"), 1500);
  } catch (error) {
    console.error("❌ Error placing order:", error.response?.data || error.message);
    toast.error("Failed to place order. Please try again.", {
      position: "bottom-center",
      theme: "light",
    });
  }
};

  return (
    <div className="bg-white p-3 sm:p-8 rounded-none sm:rounded-2xl shadow-none sm:shadow-lg max-w-3xl mx-auto mt-2 sm:mt-10">
      
      <h1 className="text-xl sm:text-3xl font-bold mb-5 sm:mb-6 text-gray-800 text-center">
        🛒 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>Your cart is empty.</p>
        </div>
      ) : (
        <form onSubmit={handleOrder} className="space-y-4 sm:space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col sm:flex-row justify-between  border border-gray-200 p-3 sm:p-4 rounded-xl hover:shadow-md transition"
            >
              <div className="flex flex-col sm:text-left">
                <h2 className=" sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 text-sm">
                  ₹{item.price} × {item.quantity}{" "}
                  <span className="font-semibold text-gray-700">
                    = ₹{item.price * item.quantity}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.name)}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                >
                  −
                </button>
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => increaseQuantity(item.name)}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.name)}
                  className="ml-1 sm:ml-3 text-red-500 text-xs sm:text-sm hover:text-red-600 font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <hr className="my-4 sm:my-5" />
          <div className="flex justify-between items-center text-base sm:text-xl font-bold text-gray-800">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold mb-1 text-sm sm:text-base"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your 10-digit phone number"
              value={phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700 text-sm sm:text-base"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* ORDER BUTTON */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white px-6 sm:px-10 py-2.5 sm:py-3 rounded-xl hover:bg-green-600 transition text-base sm:text-lg font-semibold shadow-md"
            >
              🧾 Place Order
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Cart;
