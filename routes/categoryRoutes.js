import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express();

router.get("/api/categories", categoryController.getAll);
router.get("/api/categories/:id", categoryController.getById);
router.post("/api/categories", categoryController.create);
router.patch("/api/categories/:id", categoryController.update);
router.delete("/api/categories/:id", categoryController.deleted);

export default router;
