import Order from "../models/Order.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import nodemailer from "nodemailer";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Helper function to send order email to owner
const sendOrderEmailToOwner = async (order) => {
  try {
    const productDetails = order.products
      .map(
        (p) => `
          <tr>
            <td style="border:1px solid #ddd;padding:8px;">
              ${p.product?.name || "Product"}
            </td>
            <td style="border:1px solid #ddd;padding:8px;text-align:center;">
              ${p.quantity}
            </td>
            <td style="border:1px solid #ddd;padding:8px;text-align:right;">
              ₹${p.price}
            </td>
            <td style="border:1px solid #ddd;padding:8px;text-align:right;">
              ₹${p.price * p.quantity}
            </td>
          </tr>
        `
      )
      .join("");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `🎉 New Order Received - ${order.orderId}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;">
          <h2>New Order Placed</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date(
            order.createdAt
          ).toLocaleString()}</p>

          <h3>Customer Details</h3>
          <p>Name: ${order.customerDetails?.name || "N/A"}</p>
          <p>Email: ${order.customerDetails?.email || "N/A"}</p>
          <p>Phone: ${order.customerDetails?.phone || "N/A"}</p>
          <p>Address: ${order.customerDetails?.address || "N/A"}</p>

          <h3>Order Items</h3>
          <table style="width:100%;border-collapse:collapse;">
            <thead>
              <tr style="background:#f2f2f2;">
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${productDetails}</tbody>
          </table>

          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>

          <hr/>
          <p style="font-size:12px;color:#666;">
            Automated notification from ARS Electronics World
          </p>
        </div>
      `,
    });

    console.log("✓ Order email sent to owner");
  } catch (error) {
    console.error("❌ Error sending order email:", error.message);
  }
};

/* =========================
   CONTROLLERS
========================= */

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, customerDetails } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products array is required" });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ message: "Valid totalAmount is required" });
    }

    if (
      !customerDetails?.name ||
      !customerDetails?.email ||
      !customerDetails?.phone ||
      !customerDetails?.address
    ) {
      return res.status(400).json({
        message:
          "Complete customer details (name, email, phone, address) required",
      });
    }

    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      user: req.user?.id || null,
      products,
      totalAmount,
      customerDetails,
      paymentStatus: "pending",
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: order._id.toString(),
    });

    await Order.findByIdAndUpdate(order._id, {
      razorpayOrderId: razorpayOrder.id,
    });

    return res.status(201).json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Order creation error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "failed" });
      return res.status(400).json({ message: "Invalid signature" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "success",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        orderStatus: "confirmed",
      },
      { new: true }
    ).populate("products.product");

    await sendOrderEmailToOwner(updatedOrder);

    return res.status(200).json({
      message: "Payment verified successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const validStatuses = [
      "placed",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product")
      .populate("user");

    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  createOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
  handleWebhook: async (req, res) => {
    try {
      const event = req.body.event;
      const payload = req.body.payload;

      if (event === "payment.authorized" || event === "order.paid") {
        const razorpayPaymentId = payload.payment?.id;
        const razorpayOrderId = payload.order?.id;

        if (razorpayPaymentId && razorpayOrderId) {
          await Order.findOneAndUpdate(
            { razorpayOrderId },
            { 
              paymentStatus: "success",
              razorpayPaymentId,
              orderStatus: "confirmed"
            }
          );
          console.log("✅ Webhook: Payment confirmed for order", razorpayOrderId);
        }
      }

      if (event === "payment.failed") {
        const razorpayOrderId = payload.order?.id;
        if (razorpayOrderId) {
          await Order.findOneAndUpdate(
            { razorpayOrderId },
            { paymentStatus: "failed" }
          );
          console.log("❌ Webhook: Payment failed for order", razorpayOrderId);
        }
      }

      return res.status(200).json({ status: "ok" });
    } catch (error) {
      console.error("❌ Webhook error:", error);
      return res.status(500).json({ message: error.message });
    }
  }
};
