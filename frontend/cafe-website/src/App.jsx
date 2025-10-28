import React from 'react'
import Menu from '../pages/menu'
import UserRoutes from '../Routes/User'
import { CartProvider } from '../context/CartContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <CartProvider>
        <UserRoutes />;
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      </CartProvider>
    </div>
  )
}

export default App