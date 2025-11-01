import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); 

export const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connect successfully");
    }catch(err){
        console.error("connection error", err.message);
    }
};