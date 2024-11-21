import express from "express";
import * as productController from "../controllers/productController.js";
import upload from "../config/multer.js"; // Import the multer configuration

const router = express.Router();

// Use upload.single('image') to handle file uploads
router.post("/api/product", upload.single('image'), productController.create);
router.get("/api/product", productController.getAll);
router.get("/api/product/:id", productController.getById);
router.patch("/api/product/:id", upload.single('image'), productController.update);
router.delete("/api/product/:id", productController.destroy);

export default router;
