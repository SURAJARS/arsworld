import express from "express";
import catalogueController from "../controllers/catalogueController.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", catalogueController.getAllCatalogues);
router.get("/category/:category", catalogueController.getCataloguesByCategory);
router.get("/single/:id", catalogueController.getCatalogue);
router.get("/stats/all", catalogueController.getCatalogueStats);

// Admin routes (protected)
router.post("/", adminAuth, catalogueController.createCatalogue);
router.put("/:id", adminAuth, catalogueController.updateCatalogue);
router.delete("/:id", adminAuth, catalogueController.deleteCatalogue);

export default router;
