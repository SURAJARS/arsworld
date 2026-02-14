import express from "express";
import { adminAuth } from "../middleware/auth.js";
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

/* PUBLIC */
router.post("/create", createEnquiry);

/* PUBLIC - TODO: Add adminAuth when admin auth is enabled */
router.get("/", getEnquiries);
router.put("/:id/status", updateEnquiryStatus);
router.delete("/:id", deleteEnquiry);

export default router;
