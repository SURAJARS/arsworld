import express from "express";
import { adminAuth } from "../middleware/auth.js";
import productController from "../controllers/productController.js";

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/admin/all", productController.getAllProductsAdmin); // must be before /:id
router.get("/popular", productController.getPopularProducts);
router.get("/use-case/:useCase", productController.getProductsByUseCase);
router.get("/:id", productController.getProductById);
router.post("/compare", productController.compareProducts);

// Admin routes (temporarily open for initial setup)
// TODO: Add adminAuth back once user is properly authenticated
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
