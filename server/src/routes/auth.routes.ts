import express, { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
} from "../controllers/auth.controllers.js";
import {
	userSignUpInputValidators,
	userLoginInputValidators,
} from "../validators/auth.validators.js";
import { handleInputValidation } from "../middlewares/validation.middleware.js";

const router: Router = express.Router();

// routes;
router.post(
	"/signup",
	userSignUpInputValidators,
	handleInputValidation,
	registerUser
);

router.post(
	"/login",
	userLoginInputValidators,
	handleInputValidation,
	loginUser
);

router.post("/logout", logoutUser);

export default router;
