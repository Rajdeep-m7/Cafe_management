import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";
import Order from "../components/Order";
import AdminMenu from "../components/AdminMenu";
import AddEditForm from "../components/AddEditForm"; // 🧩 import the form component

function Admin() {
  const [activeItem, setItem] = useState("Orders");
  const [formMode, setFormMode] = useState(null); // "add" | "edit" | null
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  // ✅ Fetch menu items from API
  const fetchMenuItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/menu");
      setMenuItems(res.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  useEffect(() => {
    if (activeItem === "Menu") fetchMenuItems();
  }, [activeItem]);

  const handleAdd = () => {
    setFormMode("add");
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (item) => {
    setFormMode("edit");
    setSelectedItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setFormMode(null);
    setSelectedItem(null);
  };

  const handleSuccess = () => {
    fetchMenuItems(); // refresh list
    handleCancel();
  };

  return (
    <div className="bg-gray-50 p-5 md:p-10 md:px-20 h-full">
      {/* --- Header --- */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-5">
          Admin Dashboard
        </h1>
        <div>
          <NavLink
            to="/"
            className="cursor-pointer w-fit border-gray-300 bg-white md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg"
          >
            <GoArrowLeft /> Back to Home
          </NavLink>
        </div>
      </div>

      {/* --- Tabs --- */}
      <div className="flex gap-3 mt-5 bg-gray-200 p-1 w-fit rounded-lg font-semibold mb-5">
        <button
          onClick={() => setItem("Orders")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeItem === "Orders" ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          Orders
        </button>

        <button
          onClick={() => setItem("Menu")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeItem === "Menu" ? "bg-white text-black" : "bg-transparent"
          }`}
        >
          Menu Management
        </button>
      </div>

      {/* --- Conditional Sections --- */}
      {activeItem === "Orders" ? (
        <Order
          order_id={123456789}
          number={9832349168}
          date="12/3/25"
          time="12:05"
          items={[
            { name: "Coffee", quantity: 2, price: 240 },
            { name: "Burger", quantity: 1, price: 120 },
          ]}
          total_price={360}
        />
      ) : (
        <div>
          {/* 🧩 Show Add/Edit Form */}
          {formMode && (
            <AddEditForm
              mode={formMode}
              item={selectedItem}
              onCancel={handleCancel}
              onSuccess={handleSuccess}
            />
          )}

          {/* --- Add Button --- */}
          <button
            onClick={handleAdd}
            className="border border-gray-300 cursor-pointer hover:bg-green-600 bg-green-500 font-semibold text-white p-2 px-4 rounded-lg"
          >
            + Add new Item
          </button>

          {/* --- Menu Grid --- */}
          <div className="mt-6 grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {menuItems.map((item) => (
              <AdminMenu
                key={item._id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                onEdit={() => handleEdit(item)} // 👈 pass edit handler
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
