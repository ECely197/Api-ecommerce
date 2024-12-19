import express from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, softDeleteOrder } from "../controllers/orderController.js";

const router = express.Router();

router.get("/order", getAllOrders);
router.get("/order/:id", getOrderById);
router.post("/order", createOrder);
router.patch("/order/:id", updateOrder);
router.delete("/order/:id", softDeleteOrder);

export default router;
