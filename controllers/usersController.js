import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 
import { body, validationResult } from 'express-validator'; // Importa para validaciones

// Obtener lista de usuarios
async function list(req, res) {
    try {
        const userList = await User.find({ deletedAt: null });
        return res.json(userList);
    } catch (err) {
        console.error('Error fetching user list:', err.message);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}

// Eliminar un usuario (marcar como eliminado)
async function destroy(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { deletedAt: Date.now() }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        return res.json({ message: "Usuario borrado" });
    } catch (err) {
        console.error('Error deleting user:', err.message);
        return res.status(500).json({ message: 'Error del servidor' });
    }
}
// Actualizar un usuario
async function update(req, res) {
  try {
      const { firstname, lastname, email, avatar } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
          req.params.id, 
          { firstname, lastname, email, avatar },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(updatedUser);
  } catch (err) {
      console.error('Error updating user:', err.message);
      return res.status(500).json({ message: 'Error del servidor' });
  }
}



// Obtener el perfil de usuario
async function getUserProfile(req, res) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'No se proporcionó un token de autorización' });
        }

        // Decodifica el token para obtener el userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // ID del usuario

        const user = await User.findById(userId).select('firstname lastname avatar'); 
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.json({
            name: `${user.firstname} ${user.lastname}`,
            avatar: user.avatar // La ruta correcta del archivo
        });
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        return res.status(500).json({ message: 'Error del servidor', error: err.message });
    }
}

// Exportar la función
export default { destroy, list, getUserProfile, update };