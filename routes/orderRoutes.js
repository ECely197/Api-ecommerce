import express from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, softDeleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/api/order", getAllOrders);
router.get("/api/order/:id", getOrderById);
router.post("/api/order", createOrder);
router.patch("/api/order/:id", updateOrder);
router.delete("/api/order/:id", softDeleteOrder);

export default router;
