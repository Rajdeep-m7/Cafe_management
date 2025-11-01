import { Router } from "express";
import { addMenu, deleteMenu, getMenu, updateMenu } from "../controllers/menu.controller.js";
import multer from "multer";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/menu", getMenu);
router.post("/addMenu", upload.single("image"), addMenu);

router.put("/menu/:id", updateMenu);  // ✅ edit
router.delete("/menu/:id", deleteMenu); // ✅ optional delete

export default router;