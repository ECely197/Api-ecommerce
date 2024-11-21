import dotenv from "dotenv";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import connectDB from "../config/database.js";
dotenv.config();
const seedOrders = async (orders) => {
  try {
    await connectDB();

    await Order.insertMany(orders);

    console.log("Pedidos pre-cargados en la base de datos");
    process.exit();
  } catch (error) {
    console.error("Error al insertar los pedidos", error);
    process.exit(1);
  }
};

const orders = [
  {
    user: "66f04938a791880baf53d9c4",
    products: [
      {
        product: "66f04acfbc0b2e4aba2a2508",
        quantity: 2,
        price: 89.99,
      },
    ],
    totalAmount: 179.98,
    status: "Pendiente",
  },
  {
    user: "66f056ee60e9ab5e87d65ba8",
    products: [
      {
        product: "66f0574360e9ab5e87d65baa",
        quantity: 1,
        price: 150,
      },
    ],
    totalAmount: 150,
    status: "Enviado",
  },
];

seedOrders(orders);
