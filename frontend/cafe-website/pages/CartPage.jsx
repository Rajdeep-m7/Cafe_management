import React from "react";
import Cart from "../Components/Cart";
import { useCart } from "../context/CartContext";

function CartPage() {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <div className="md:p-10 p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <Cart
        cartItems={cartItems}
        totalPrice={totalPrice}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />
      
    </div>
  );
}

export default CartPage;
