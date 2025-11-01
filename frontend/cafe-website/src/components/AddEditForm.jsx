import React, { useState } from "react";
import axios from "axios";

const AddEditForm = ({ mode = "add", item, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    category: item?.category || "",
    price: item?.price || "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object (required for multer)
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      if (formData.image) data.append("image", formData.image);

      if (mode === "add") {
        await axios.post("http://localhost:3000/api/addMenu", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`http://localhost:5000/editMenu/${item._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess?.(); // refresh menu list
    } catch (err) {
      console.error("Error submitting form:", err);
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
      <h2 className="text-xl font-semibold mb-4">
        {mode === "add" ? "Add New Menu Item" : "Edit Menu Item"}
      </h2>

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
          required={mode === "add"}
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

export default AddEditForm;
