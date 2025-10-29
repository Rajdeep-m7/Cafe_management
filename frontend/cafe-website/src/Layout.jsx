import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useCart } from "./context/CartContext";


const Layout = () => {
  const {cartItems} = useCart()
  return (
    <>
      <Navbar cartItems={cartItems}  />
      <Outlet /> {/* This will render child routes */}
    </>
  );
};

export default Layout;
