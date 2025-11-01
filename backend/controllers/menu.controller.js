import menu from "../models.js/menu.models.js";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})


export const getMenu = async (req, res) =>{ //get menu
   try{
    const items= await menu.find().sort({category:1});
    res.json(items)
   }catch(err){
    res.status(500).json({ message: err.message });
   }
}

export const addMenu = async (req,res)=>{
    try{
        const { name, description, price, category } = req.body;
        if(!req.file) return res.status(400).json({message: "image required"});

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Cafe_Menu",
            resource_type: "auto",
            timeout: 60000,
        });
        fs.unlinkSync(req.file.path);

        const newMenu = await menu.create({
            name,
            description,
            price,
            category,
            image: result.secure_url,
        });

        res.status(201).json(newMenu);

    }catch(err){
        console.error("Error adding menu:", err);
        res.status(500).json({ message: err.message });
    }
}

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, image } = req.body;

    const updated = await menu.findByIdAndUpdate(
      id,
      { name, description, category, price, image },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Menu item not found" });

    res.status(200).json({
      message: "Menu item updated successfully",
      item: updated,
    });
  } catch (error) {
    console.error("Error updating menu:", error);
    res.status(500).json({ message: "Failed to update menu", error });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await menu.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const publicId = item.image.split("/").pop().split(".")[0]; // get filename
    await cloudinary.uploader.destroy(`Cafe_Menu/${publicId}`);

    await menu.findByIdAndDelete(id);

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    console.error("Error deleting menu:", err);
    res.status(500).json({ message: err.message });
  }
};



