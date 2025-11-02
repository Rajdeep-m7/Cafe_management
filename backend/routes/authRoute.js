import express from "express";
import { loginAdmin, logoutAdmin, checkAuth } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", loginAdmin);
authRouter.get("/check", checkAuth);
authRouter.post("/logout", logoutAdmin);

export default authRouter;
