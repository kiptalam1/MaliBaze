import express from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

import {
	addProductToCart,
	decrementProductQuantity,
	incrementProductQuantity,
	removeProductFromCart,
	getUserCart,
} from "../controllers/cart.controllers.js";

const router = express.Router();

router.get("/", authenticateUser, getUserCart);
router.post("/item/:id", authenticateUser, addProductToCart);
router.delete("/item/:id", authenticateUser, removeProductFromCart);
router.patch("/item/:id/increment", authenticateUser, incrementProductQuantity);
router.patch("/item/:id/decrement", authenticateUser, decrementProductQuantity);

export default router;
