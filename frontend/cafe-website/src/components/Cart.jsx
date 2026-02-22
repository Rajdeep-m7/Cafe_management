import axios from "axios";
import React, { useState } from "react";
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
  const [name, setName] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Handle Phone Input
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setPhone(cleaned);

    if (phoneError) setPhoneError("");
  };

  // Handle Name Input
  const handleNameChange = (e) => {
    setName(e.target.value);

    if (nameError) setNameError("");
  };

  // Handle Order Submit
  const handleOrder = async (e) => {
    e.preventDefault();

    setNameError("");
    setPhoneError("");

    if (!name.trim()) {
      setNameError("Please enter your name.");
      return;
    }

    if (!phone || phone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        name,
        phone,
        total_price: totalPrice,
        order_items: cartItems.map((item) => ({
          item_name: item.name,
          item_quantity: item.quantity,
          item_price: item.price,
        })),
      };

      const response = await axios.post(
        "https://cafe-management-a7uc.onrender.com/api/addOrder",
        orderData
      );

      toast.success("✅ Order placed successfully!", {
        position: "bottom-center",
        theme: "light",
      });

      console.log("🧾 Order saved:", response.data);

      clearCart();
      setPhone("");
      setName("");

      setTimeout(() => navigate("/"), 1500);

    } catch (error) {
      console.error(
        "❌ Error placing order:",
        error.response?.data || error.message
      );

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

          {/* CART ITEMS */}
          {cartItems.map((item) => (
            <div
              key={item.name}
              className="flex flex-col sm:flex-row justify-between border border-gray-200 p-3 sm:p-4 rounded-xl hover:shadow-md transition"
            >

              <div className="flex flex-col sm:text-left">
                <h2 className="sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  ₹{item.price} × {item.quantity}
                  <span className="font-semibold text-gray-700">
                    {" "} = ₹{item.price * item.quantity}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">

                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.name)}
                  className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  type="button"
                  onClick={() => increaseQuantity(item.name)}
                  className="bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.name)}
                  className="ml-2 text-red-500 text-sm hover:text-red-600"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          <hr className="my-4" />

          {/* TOTAL */}
          <div className="flex justify-between text-lg sm:text-xl font-bold">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>


          {/* PHONE INPUT */}
          <div>

            <label className="block font-semibold mb-1">
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            {phoneError && (
              <p className="text-red-500 text-sm mt-1">
                {phoneError}
              </p>
            )}

          </div>


          {/* NAME INPUT */}
          <div>

            <label className="block font-semibold mb-1">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

            {nameError && (
              <p className="text-red-500 text-sm mt-1">
                {nameError}
              </p>
            )}

          </div>


          {/* ORDER BUTTON */}
          <div className="flex justify-center mt-4">

            <button
              type="submit"
              className="bg-green-500 text-white px-10 py-3 rounded-xl hover:bg-green-600 font-semibold shadow-md"
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
