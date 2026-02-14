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

// Razorpay webhook – public (from Razorpay)
router.post("/webhook", orderController.handleWebhook);

/**
 * =========================
 * USER ROUTES (AUTH REQUIRED)
 * =========================
 */

// Logged-in user orders
router.get("/my-orders", auth, orderController.getUserOrders);

/**
 * =========================
 * ADMIN ROUTES
 * =========================
 */

// Admin – all orders (MUST be before /:id route)
router.get("/all-orders", orderController.getAllOrders);

// Get single order (user) – generic :id route MUST come last
router.get("/:id", auth, orderController.getOrderById);

// Admin – update order status
router.put("/:id/status", adminAuth, orderController.updateOrderStatus);

export default router;
