import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/auth.middlewares.js";
import { createProductValidators } from "../validators/product.validators.js";
import { handleInputValidation } from "../middlewares/validation.middleware.js";
import { createProduct } from "../controllers/product.controllers.js";

const router = express.Router();

router.post(
	"/create",
	authenticateUser,
	isAdmin,
	createProductValidators,
	handleInputValidation,
	createProduct
);

export default router;
