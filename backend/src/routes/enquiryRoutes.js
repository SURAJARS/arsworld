import express from "express";
import { adminAuth } from "../middleware/auth.js";
import enquiryController from "../controllers/enquiryController.js";

const router = express.Router();

router.post("/create", enquiryController.createEnquiry);

// TODO: Re-enable adminAuth after proper admin setup
router.get("/", enquiryController.getEnquiries);

router.put("/:id/status", adminAuth, enquiryController.updateEnquiryStatus);
router.delete("/:id", adminAuth, enquiryController.deleteEnquiry);

export default router;
