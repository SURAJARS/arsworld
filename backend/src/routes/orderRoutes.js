import express from "express";
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const orderController = require('../controllers/orderController');

router.post('/create', orderController.createOrder);
router.post('/verify', orderController.verifyPayment);
router.get('/my-orders', auth, orderController.getUserOrders);
// TODO: Re-enable adminAuth after proper admin setup
router.get('/all-orders', orderController.getAllOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

module.exports = router;

