import express from "express";
import usersController from "../controllers/usersController.js";
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get("/users", usersController.list);

// Ruta para obtener un usuario por ID
router.get("/users/:id", usersController.getUserProfile);



// Ruta para actualizar un usuario
router.patch("/users/:id", usersController.update);

// Ruta para eliminar un usuario
router.delete("/users/:id", usersController.destroy);

export default router;
