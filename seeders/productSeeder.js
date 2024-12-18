import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";
import connectDB from "../config/database.js";
import { asignarCategoriaPorTipo } from "../controllers/productController.js";

dotenv.config();

// Función para el seeder de productos
async function productSeeder() {
  await connectDB(); // Conexión a la base de datos
  try {
    // Limpiar la colección antes de insertar nuevos productos
    await Product.deleteMany({});

    // Crear nuevos productos
    const products = [
      {
        tipo: "dia de las madres",
        nombre: "Ramo de flores",
        precio: 350000,
        descripcionOne: "Unas hermosas flores para regalar a la madre",
        descripciontwo: "Incluye margaritas, rosas",
        images: [
          "https://media.istockphoto.com/id/1353442746/es/foto/regalo-de-navidad-3d-regalo-sobre-fondo-rojo-con-espacio-de-copia.jpg?s=612x612&w=0&k=20&c=2DwgJvKq4ojp0KchNABQVdx2fgHP4-N_PYDnlVfopQ4=",
          "https://media.istockphoto.com/id/1477614491/es/foto/caja-de-regalo-roja-para-navidad-espacio-de-copia-3d-renderizado.jpg?s=612x612&w=0&k=20&c=2Mi3V9YOlO8DrojUvzSmQ2yXojVNZv-cycyDz_RTftQ="
        ],
        material: "flores",
        dimensions: "30x20x15 cm",
        stock: 100,
        shippingTime: "3-5 días laborales",
        marca: "naturales",
      },
      {
        _id: new mongoose.Types.ObjectId(),
        nombre: "Tasa",
        tipo: "dia del padre",
        precio: 600000,
        categoriaId: mongoose.Category_Id,
        descripcionOne: "Una cesta exquisita con productos gourmet.",
        descripciontwo: "Incluye una variedad de chocolates, quesos y vinos selectos.",
        images: [
          "https://images.unsplash.com/photo-1557221753-1c1cd7214a53",
          "https://images.unsplash.com/photo-1610780374460-5c488cc3761f",
          "https://images.unsplash.com/photo-1586657989665-89d7c6236b77",
        ],
        material: "Variedad",
        dimensions: "40x30x25 cm",
        stock: 50,
        shippingTime: "3-5 días laborales",
        marca: "Gourmet Delights",
      },
      {
        
        tipo: "dia del amor y la amistad",
        precio: 75000,
        descripcionOne: "Un juego de té de cerámica que combina elegancia y funcionalidad.",
        images: [
          "https://images.unsplash.com/photo-1594855643243-4eb2b7351c3c",
          "https://images.unsplash.com/photo-1594855732306-9f9f10a40393",
        ],
        material: "Cerámica",
        dimensions: "Juego de 5 piezas",
        stock: 20,
        shippingTime: "2-4 días laborales",
        marca: "Tea Elegance",
      },
     ];
     for (const productData of products) {
      try {
        // Asignar categoría según el tipo
        const categoryId = await asignarCategoriaPorTipo(productData.tipo);

        // Crear el producto directamente
        const product = await Product.create({ ...productData, categoria: categoryId });
        console.log(`Producto creado: ${product.nombre}`);
      } catch (error) {
        console.error(`Error al crear el producto ${productData.nombre}:`, error.message);
      }
    }
    console.log("[DB] Seeder ejecutado con éxito.");
  } catch (err) {
    console.error("[DB] Error al ejecutar el seeder:", err);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      mongoose.connection.close();
    }
  }
}

// Ejecutar el seeder
productSeeder();
