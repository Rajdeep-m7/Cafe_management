import { Router } from "express";
import { addMenu, getMenu } from "../controllers/menu.controller.js";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/menu", getMenu);
router.post("/addMenu", upload.single("image"), addMenu);

export default router;