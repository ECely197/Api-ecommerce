import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/auth.routes.js"
import {createRoles} from "./libs/initialSetup.js"
import orderRoutes from "./routes/orderRoutes.js";
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = dirname(__filename); // Get the directory name


const app = express();
createRoles()
app.use(express.json());
connectDB();

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(userRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(authRoutes)
app.use(orderRoutes);


app.listen(3000, () => {
    console.log("El servidor está corriendo en el puerto 3000");
    console.log(process.env.PORT);
});
