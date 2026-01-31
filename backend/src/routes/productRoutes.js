const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/admin/all', productController.getAllProductsAdmin); // Admin endpoint - must be before /:id
router.get('/popular', productController.getPopularProducts);
router.get('/use-case/:useCase', productController.getProductsByUseCase);
router.get('/:id', productController.getProductById);
router.post('/compare', productController.compareProducts);
// Note: Product creation, updates and deletion temporarily allow no auth for initial setup
// TODO: Add adminAuth back once user is properly authenticated
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
