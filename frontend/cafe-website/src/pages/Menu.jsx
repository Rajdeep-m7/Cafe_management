import React, { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import MenuCard from "../components/MenuCard";
import { useCart } from "../context/CartContext";
import { NavLink } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Menu() {
  const { addToCart } = useCart();

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Tea" },
    { id: 3, name: "Coffee" },
    { id: 4, name: "Drinks" },
    { id: 5, name: "Burger" },
    { id: 6, name: "Pizza" },
    { id: 7, name: "Sandwich" },
    { id: 8, name: "Momo" },
    { id: 9, name: "Noodles" },
    { id: 10, name: "Snacks" },
    { id: 12, name: "Veg" },
    { id: 13, name: "NonVeg" },
    { id: 14, name: "IceCream" },
  ];

  const fetchMenu = async () => {
    const { data } = await axios.get("http://localhost:3000/api/menu");
    return data;
  };

  const {
    data: menuItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenu,
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  if (isLoading) return <p className="p-10 text-center">Loading menu...</p>;
  if (isError)
    return (
      <p className="p-10 text-center text-red-500">
        Error: {error.message || "Failed to load menu"}
      </p>
    );

  return (
    <div className="bg-gray-50 w-full min-h-lvh md:p-10 p-5 pt-10 md:px-20 relative">
      <NavLink
        to="/Admin"
        className="cursor-pointer absolute top-5 right-5 border-gray-300 bg-white md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg"
      >
        <IoLockClosedOutline /> Admin
      </NavLink>

      <div>
        <h1 className="text-4xl font-bold mb-2">Our Menu</h1>
        <p className="text-gray-500">
          Fresh and delicious items made with love
        </p>
      </div>

      <div
        className="mt-6 overflow-x-auto scrollbar-hide rounded-xl xl:flex xl:justify-center"
        style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        <div className="bg-gray-200 w-fit p-1 rounded-xl flex gap-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`px-5 py-2 rounded-xl font-semibold transition-all duration-200 ${
                activeCategory === cat.name ? "bg-white" : "text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

    
      <div className="mt-6 grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <MenuCard
              key={item._id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              onAddToCart={() => addToCart(item)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No items found in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default Menu;
