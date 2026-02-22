import React from 'react'
import UserRoutes from './Routes/User'
import { CartProvider } from './context/CartContext'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient} >
        <AuthProvider >
          <CartProvider>
            <UserRoutes />
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
        </AuthProvider> 
      </QueryClientProvider>
    </div>
  )
}

export default App