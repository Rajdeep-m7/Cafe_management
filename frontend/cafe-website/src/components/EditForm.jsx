import React, { useState } from "react";
import axios from "axios";

const EditForm = ({ item, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "",
    price: item?.price || "",
    image: item?.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      handleImageUpload(files[0]); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Cafe_Menu"); 

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwygkjbmc/image/upload",
        data
      );
      setFormData((prev) => ({ ...prev, image: res.data.secure_url }));
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`http://localhost:3000/api/menu/${item._id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      onSuccess?.();
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Error saving item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded-md"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded-md md:col-span-2"
          required
        ></textarea>
      </div>

      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-md mt-3"
        />
      )}

      <div className="mt-4 flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
