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

const allowedOrigins = [
  "https://cafe-management-frontend.onrender.com",
  "http://localhost:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn("Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.use('/api',router);
app.use('/api/auth',authRouter)

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});