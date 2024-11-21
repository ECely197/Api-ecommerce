import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/api/order", orderController.getAllOrders);
router.get("/api/order/:id", orderController.getORderById);
router.post("/api/order", orderController.createOrder);
router.patch("/api/order/:id", orderController.updateOrder);
router.delete("/api/order/:id", orderController.softDeleteOrder);

export default router;
