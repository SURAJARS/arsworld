import express from "express";
import { auth, adminAuth } from "../middleware/auth.js";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", orderController.createOrder);
router.post("/verify", orderController.verifyPayment);

router.get("/my-orders", auth, orderController.getUserOrders);

// TODO: Re-enable adminAuth after proper admin setup
router.get("/all-orders", orderController.getAllOrders);

router.get("/:id", auth, orderController.getOrderById);
router.put("/:id/status", adminAuth, orderController.updateOrderStatus);

export default router;
