import React, { useEffect, useState } from "react";
import { NavLink } from "react-router"; 
import { GoArrowLeft } from "react-icons/go";
import axios from "axios";
import Order from "../components/Order";
import AdminMenu from "../components/AdminMenu";
import AddForm from "../components/AddForm";  
import EditForm from "../components/EditForm"; 

function Admin() {
  const [activeItem, setItem] = useState("Orders");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);


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
    setShowAddForm(true);
    setShowEditForm(false);
    setSelectedItem(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (item) => {
    setShowEditForm(true);
    setShowAddForm(false);
    setSelectedItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedItem(null);
  };

 
  const handleSuccess = () => {
    fetchMenuItems();
    handleCancel();
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this item?")) return;

  try {
    await axios.delete(`http://localhost:3000/api/menu/${id}`);
    alert("Item deleted successfully");
    fetchMenuItems(); 
  } catch (err) {
    console.error("Error deleting item:", err.message );
    alert("Failed to delete item");
  }
};


  return (
    <div className="bg-gray-50 p-5 min-h-lvh md:p-10 md:px-20 h-full">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-5">Admin Dashboard</h1>
        <div>
          <NavLink
            to="/"
            className="cursor-pointer w-fit border-gray-300 bg-white md:right-10 hover:bg-green-500 hover:text-white font-semibold flex items-center gap-1 border p-1 rounded-lg"
          >
            <GoArrowLeft /> Back to Home
          </NavLink>
        </div>
      </div>

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
          {showAddForm && (
            <AddForm onCancel={handleCancel} onSuccess={handleSuccess} />
          )}
          {showEditForm && selectedItem && (
            <EditForm
              item={selectedItem}
              onCancel={handleCancel}
              onSuccess={handleSuccess}
            />
          )}

          {/* --- Add Button --- */}
          {!showAddForm && !showEditForm && (
            <button
              onClick={handleAdd}
              className="border border-gray-300 cursor-pointer hover:bg-green-600 bg-green-500 font-semibold text-white p-2 px-4 rounded-lg"
            >
              + Add new Item
            </button>
          )}

          {/* --- Menu Grid --- */}
          <div className="mt-6 grid gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
            {menuItems.map((item) => (
              <AdminMenu
                key={item._id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item._id)} // 👈 pass edit handler
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
