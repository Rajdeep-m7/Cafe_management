import express, { Router } from "express";
import router from "./routes/index.js";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from "./db/ConncetDb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
dotenv.config(); 

const app= express();
app.use(cookieParser());
connectDb();


app.use(
  cors({
    origin: "https://cafe-management-frontend.onrender.com", 
    credentials: true,
  })
);
app.use(express.json());

app.use('/api',router);
app.use('/api/auth',authRouter)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});