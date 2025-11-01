import express from "express";
import router from "./routes/index.js";
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from "./db/ConncetDb.js";
dotenv.config(); 

const app= express();

connectDb();


app.use(cors());
app.use(express.json());

app.use('/api',router);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});