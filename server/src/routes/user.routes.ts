import express from "express";
import {
	getMyProfile,
	updateMyProfile,
} from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
import { userProfileUpdateInputValidators } from "../validators/user.validators.js";

const router = express.Router();

router.get("/me", authenticateUser, getMyProfile);
router.patch(
	"/update-profile",
	authenticateUser,
	userProfileUpdateInputValidators,
	updateMyProfile
);

router.patch(
	"/update-profile",
	authenticateUser,
	userProfileUpdateInputValidators,
	updateMyProfile
);

router.patch(
	"/update-profile",
	authenticateUser,
	userProfileUpdateInputValidators,
	updateMyProfile
);

export default router;
