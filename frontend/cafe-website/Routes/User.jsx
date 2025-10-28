import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Menu from '../pages/menu'
import Orders from '../pages/Orders'
import Layout from '../src/Layout';
import Cart from '../pages/CartPage';
import Admin from '../pages/Admin';

const router= createBrowserRouter (
    createRoutesFromElements(
        <>
         <Route element={<Layout />} >
            <Route path='/' element={<Menu />} />
            <Route path='/Orders' element={<Orders />} />
            <Route path='/Cart' element={<Cart />} />
        </Route>
        <Route>
            <Route path='/Admin' element={<Admin />} />
        </Route>
        </>
       
    )
);
export default function UserRoutes() {
  return <RouterProvider router={router} />;
}