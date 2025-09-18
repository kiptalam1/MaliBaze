import express from "express";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

import {
  addProductToCart,
  removeProductFromCart,
} from "../controllers/cart.controllers.js";

const router = express.Router();


router.post("/item/:id", authenticateUser, addProductToCart);
router.delete("/item/:id", authenticateUser, removeProductFromCart);

export default router;
