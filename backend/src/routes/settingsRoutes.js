import express from "express";
import { adminAuth } from "../middleware/auth.js";
import settingsController from "../controllers/settingsController.js";

const router = express.Router();

router.get("/", settingsController.getSettings);

// TODO: Re-enable adminAuth after proper admin setup
router.put("/", settingsController.updateSettings);

export default router;
