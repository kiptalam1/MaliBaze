import express, { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	refreshAccessToken,
} from "../controllers/auth.controllers.js";
import {
	userSignUpInputValidators,
	userLoginInputValidators,
} from "../validators/auth.validators.js";
import { handleInputValidation } from "../middlewares/validation.middleware.js";
import { authenticateUser, isAdmin } from "../middlewares/auth.middlewares.js";

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
router.get("/admin-route", authenticateUser, isAdmin, (req, res) => {
	res.json({ message: "accepted" });
});
router.post("/refresh-token", refreshAccessToken);
export default router;
