import express from "express";
const router = express.Router();
const catalogueController = require('../controllers/catalogueController');
const { adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', catalogueController.getAllCatalogues);
router.get('/category/:category', catalogueController.getCataloguesByCategory);
router.get('/single/:id', catalogueController.getCatalogue);
router.get('/stats/all', catalogueController.getCatalogueStats);

// Admin routes (protected)
router.post('/', adminAuth, catalogueController.createCatalogue);
router.put('/:id', adminAuth, catalogueController.updateCatalogue);
router.delete('/:id', adminAuth, catalogueController.deleteCatalogue);

module.exports = router;

