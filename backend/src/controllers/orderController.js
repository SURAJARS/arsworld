const Order = require('../models/Order');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
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
        (p) =>
          `<tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${p.product?.name || 'Product'}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.quantity}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${p.price}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${p.price * p.quantity}</td>
          </tr>`
      )
      .join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `🎉 New Order Received - ${order.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #333;">New Order Placed</h2>
          <p><strong>Order ID:</strong> ${order.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          
          <h3 style="color: #555;">Customer Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Name:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${order.customerDetails?.name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${order.customerDetails?.email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Phone:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${order.customerDetails?.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;"><strong>Address:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px;">${order.customerDetails?.address || 'N/A'}</td>
            </tr>
          </table>
          
          <h3 style="color: #555;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Qty</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${productDetails}
            </tbody>
          </table>
          
          <h3 style="color: #555; margin-top: 20px;">Order Summary</h3>
          <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
          <p><strong>Payment Status:</strong> <span style="color: green; font-weight: bold;">${order.paymentStatus.toUpperCase()}</span></p>
          <p><strong>Razorpay Payment ID:</strong> ${order.razorpayPaymentId || 'N/A'}</p>
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated notification from ARS Electronics World. Please contact the customer as soon as possible to confirm the order.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Order email sent to owner:', process.env.OWNER_EMAIL);
  } catch (error) {
    console.error('Error sending order email to owner:', error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, customerDetails } = req.body;

    console.log('📝 Order creation request received:', { products, totalAmount, customerDetails });

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: 'Products array is required and must not be empty' });
    }

    if (!totalAmount || totalAmount <= 0) {
      return res
        .status(400)
        .json({ message: 'Valid totalAmount is required' });
    }

    if (!customerDetails || !customerDetails.name || !customerDetails.email || !customerDetails.phone || !customerDetails.address) {
      return res
        .status(400)
        .json({ message: 'Complete customer details (name, email, phone, address) are required' });
    }

    // Validate products structure
    for (const prod of products) {
      if (!prod.product || !prod.quantity || !prod.price) {
        return res
          .status(400)
          .json({ message: 'Each product must have product ID, quantity, and price' });
      }
    }

    console.log('✅ Validation passed, creating order...');

    // Create order in database
    const order = await Order.create({
      orderId: `ORD-${Date.now()}`,
      user: req.user?.id || null,
      products,
      totalAmount,
      customerDetails,
      paymentStatus: 'pending',
    });

    console.log('✅ Order created in database:', order._id);

    // Create Razorpay order
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials not configured');
      return res.status(500).json({ message: 'Razorpay credentials not configured' });
    }

    console.log('🔄 Creating Razorpay order...');
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), // Convert to paise and ensure integer
      currency: 'INR',
      receipt: order._id.toString(),
    });

    console.log('✅ Razorpay order created:', razorpayOrder.id);

    // Update order with Razorpay order ID
    await Order.findByIdAndUpdate(order._id, {
      razorpayOrderId: razorpayOrder.id,
    });

    console.log('✅ Order updated with Razorpay ID');

    res.status(201).json({
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalAmount,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ message: error.message || 'Error creating order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpay_signature;

    if (!isSignatureValid) {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: 'failed' });
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: 'success',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        orderStatus: 'confirmed',
      },
      { new: true }
    ).populate('products.product');

    // Send email to owner with order details
    await sendOrderEmailToOwner(updatedOrder);

    res.status(200).json({ message: 'Payment verified successfully', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user')
      .populate('products.product')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = ['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product')
      .populate('user');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
