import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/auth.middlewares.js";
import {
	getAllOrders,
	getMyOrders,
	placeOrder,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/place", authenticateUser, placeOrder);
router.get("/my-orders", authenticateUser, getMyOrders);
router.get("/all-orders", authenticateUser, isAdmin, getAllOrders);

export default router;
