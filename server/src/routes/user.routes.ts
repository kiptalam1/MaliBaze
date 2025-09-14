import express from "express";
import { getMyProfile } from "../controllers/user.controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/me", authenticateUser, getMyProfile);

export default router;
