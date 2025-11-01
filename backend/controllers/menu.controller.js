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

