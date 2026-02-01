import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

/**
 * =========================
 * PUBLIC ROUTES (NO AUTH)
 * =========================
 */

// Guest checkout – MUST be public
router.post("/create", orderController.createOrder);

// Razorpay verification – public
router.post("/verify", orderController.verifyPayment);

/**
 * =========================
 * USER ROUTES (AUTH REQUIRED)
 * =========================
 */

// Logged-in user orders
router.get("/my-orders", auth, orderController.getUserOrders);

// Get single order (user)
router.get("/:id", auth, orderController.getOrderById);

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */

// Admin – all orders
router.get("/all-orders", adminAuth, orderController.getAllOrders);

// Admin – update order status
router.put("/:id/status", adminAuth, orderController.updateOrderStatus);

export default router;
