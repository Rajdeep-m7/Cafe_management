import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router";

function Navbar({ cartItems = [] }) {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center p-3">
        <NavLink to="/" className="text-2xl md:text-3xl text-green-500 font-bold">
          Nest Café
        </NavLink>
        <div className="flex gap-4 md:gap-10 md:mr-5 items-center">
          <NavLink
            to="/Orders"
            className="hover:bg-green-500 hover:text-white rounded-lg px-3 py-2 font-semibold transition"
          >
            Track Order
          </NavLink>
          <div className="relative">
            <NavLink to="/Cart">
              <FaCartShopping className="h-10 w-10 p-2 hover:bg-green-500 hover:text-white rounded-lg transition" />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
