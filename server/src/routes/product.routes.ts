import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/auth.middlewares.js";
import {
	createProductValidators,
	updateProductValidators,
} from "../validators/product.validators.js";
import { handleInputValidation } from "../middlewares/validation.middleware.js";
import {
	addProductToCart,
	createProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
} from "../controllers/product.controllers.js";

const router = express.Router();

router.post(
	"/create",
	authenticateUser,
	isAdmin,
	createProductValidators,
	handleInputValidation,
	createProduct
);
// all users/visitors can browse the products;
router.get("/", getAllProducts);
router.patch(
	"/:id",
	authenticateUser,
	isAdmin,
	updateProductValidators,
	handleInputValidation,
	updateProduct
);
router.delete("/:id", authenticateUser, isAdmin, deleteProduct);
router.post("/item/cart/:id", authenticateUser, addProductToCart);

export default router;
