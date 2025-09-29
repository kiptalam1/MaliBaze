import express from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { placeOrder } from "../controllers/order.controllers.js";

const router = express.Router();

router.post("/place", authenticateUser, placeOrder);

export default router;
