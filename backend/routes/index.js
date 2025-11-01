import { Router } from "express";
import { addMenu, deleteMenu, getMenu, updateMenu } from "../controllers/menu.controller.js";
import multer from "multer";
import { addOrder, getAllOrders, getOrdersByPhone } from "../controllers/order.controller.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.get("/menu", getMenu);
router.post("/addMenu", upload.single("image"), addMenu);

router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu); 

router.get("/allOrders",getAllOrders);
router.get("/orders/:phone", getOrdersByPhone);
router.post("/addOrder",addOrder);
export default router;