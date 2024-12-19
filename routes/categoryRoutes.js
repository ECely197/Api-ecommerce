import express from "express";
import categoryController from "../controllers/categoryController.js";

const router = express();

router.get("/categories", categoryController.getAll);
router.get("/categories/:id", categoryController.getById);
router.post("/categories", categoryController.create);
router.patch("/categories/:id", categoryController.update);
router.delete("/categories/:id", categoryController.deleted);

export default router;
