import express, { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { userAuthInputValidators } from "../validators/auth.validators.js";
import { handleInputValidation } from "../middlewares/validation.middleware.js";

const router: Router = express.Router();

// routes;
router.post(
	"/signup",
	userAuthInputValidators,
	handleInputValidation,
	registerUser
);

export default router;
