import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import authController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/update-language", auth, authController.updateLanguage);
router.get("/profile", auth, authController.getProfile);
router.put("/profile", auth, authController.updateProfile);

export default router;
