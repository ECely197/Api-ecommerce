import "dotenv/config";
import express from "express";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authController from "./controllers/authController.js"; // Importa tu controlador authController
import orderRoutes from "./routes/orderRoutes.js";
import upload from './config/multer.js';  // Agregado

import cors from 'cors';
import path from "path"; // Import path
import { fileURLToPath } from "url"; // Import fileURLToPath
import { dirname } from "path"; // Import dirname

const __filename = fileURLToPath(import.meta.url); // Get the current file's URL
const __dirname = dirname(__filename); // Get the directory name

const app = express();
app.use(express.json());
connectDB().catch(err => console.error('Error connecting to DB:', err)); // Handle connection error
app.use(cors());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas de autenticación
app.post('/api/auth/login', authController.login);
app.post('/api/auth/register', upload.single('avatar'), authController.register);
app.post('/api/auth/validate', authController.tokenIsValid);

// Resto de las rutas
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
