import express from "express";
import productController from "../controllers/productController.js";
import upload from "../config/multer.js"; 

const router = express.Router();

// Crear un producto (maneja la subida de una imagen)
router.post("/api/products", upload.single("image"), productController.create);
// Obtener todos los productos
router.get("/api/products", productController.list);
// Obtener un producto por su ID
router.get("/api/products/:id", productController.find);
// Actualizar un producto (maneja la subida de una nueva imagen)
router.patch("/api/products/:id", upload.single("image"), productController.update);
// Eliminar un producto
router.delete("/api/products/:id", productController.destroy);

export default router;
