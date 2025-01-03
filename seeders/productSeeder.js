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
    const products =[
      {
        _id: "6764cdc5c19f49b1f1ebabf1",
        nombre: "Ramo de flores",
        tipo: "dia de las madres",
        precio: 350000,
        images: [
          "https://floreriachic.com/cdn/shop/products/Chic-164_360x.jpg?v=1543320240",
          "https://www.floristeriaideal.com/fotos/3796_1.jpg",
          "https://www.floristeriaideal.com/fotos/3803_1.jpg"
        ],
        descripcionOne: "Unas hermosas flores para regalar a la madre",
        descripcionTwo: null,
        categoria: "6764c9e81eac352579f72fdc", // Categoría para "Día de las madres"
        material: "flores",
        dimensions: "30x20x15 cm",
        stock: 100,
        shippingTime: "3-5 días laborales",
        marca: "naturales",
        deletedAt: null
      },
      {
        _id: "6764cdc5c19f49b1f1ebabef",
        nombre: "Tasa",
        tipo: "dia del padre",
        precio: 600000,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKL2VO2GjGo2MyKNDP3ZNLh1KzRPHO2pFdw&s",
          "https://mamushkapalma.es/221-large_default/tassa-el-papa-necessita-un-cafe.jpg",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhKL2VO2GjGo2MyKNDP3ZNLh1KzRPHO2pFdw&s"
        ],
        descripcionOne: "Una cesta exquisita con productos gourmet.",
        descripcionTwo: null,
        categoria: "6764c9b1fcf1c1cd45ff378f", // Categoría para "Día del padre"
        material: "Variedad",
        dimensions: "40x30x25 cm",
        stock: 50,
        shippingTime: "3-5 días laborales",
        marca: "Gourmet Delights",
        deletedAt: null
      },
      {
        _id: "6764cdc5c19f49b1f1ebabf3",
        nombre: "Caja de chocolates artesanales",
        tipo: "dia del amor y la amistad",
        precio: 120000,
        images: [
          "https://truffelinos.com.co/wp-content/uploads/2023/04/Caja-49-U.png",
          "https://www.kaoxuechocolates.co/wp-content/uploads/2024/02/MG_0407-1.jpg",

          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQINhIQYTF7ioKeO4yCbsuI8PxaPvqVpzRTow&s"
        ],
        descripcionOne: "Una deliciosa selección de chocolates finos para compartir con alguien especial.",
        descripcionTwo: "Incluye sabores variados: chocolate oscuro, con leche y rellenos.",
        categoria: "6764c9b1fcf1c1cd45ff3790", // Categoría para "Día del amor y la amistad"
        material: "Chocolate",
        dimensions: "20x20x5 cm",
        stock: 80,
        shippingTime: "2-3 días laborales",
        marca: "ChocoLuxe",
        deletedAt: null
      },
      {
        _id: "6764cdc5c19f49b1f1ebabf4",
        nombre: "Pastel de cumpleaños personalizado",
        tipo: "cumpleaños",
        precio: 180000,
        images: [
          "https://imag.bonviveur.com/presentacion-final-de-la-tarta-de-cumpleanos-de-bizcocho-y-trufa.jpg",
          "https://i.blogs.es/c3eec2/tarta-de-crema-de-mantequilla-frambuesas-y-mascarpone/1366_2000.jpeg",  

        "https://i.blogs.es/2565fb/tarta_cumpleanos/1024_2000.jpg"        ],
        descripcionOne: "Un pastel esponjoso con decoración personalizada para celebrar un cumpleaños inolvidable.",
        descripcionTwo: "Sabores a elegir: vainilla, chocolate, fresa. Decoraciones personalizadas.",
        categoria: "6764c9b1fcf1c1cd45ff3791", // Categoría para "Cumpleaños"
        material: "Pastel, crema, decoraciones comestibles",
        dimensions: "25x25x15 cm",
        stock: 20,
        shippingTime: "1-2 días laborales",
        marca: "Sweet Moments",
        deletedAt: null
      },
      {
        _id: "6764cdc5c19f49b1f1ebabf5",
        nombre: "Caja de regalo especial",
        tipo: "dia especial",
        precio: 220000,
        images: [
          "https://creativeboxcolombia.com/wp-content/uploads/2024/03/cajas-personalizadas-regalos-creative-box-regalos-a-domicilio-compra-caja-creativa-ninos-ninas.jpg",
          "https://creativeboxcolombia.com/wp-content/uploads/2024/03/cajas-personalizadas-regalos-creative-box-regalos-a-domicilio-compra-caja-creativa-ninos-ninas.jpg",
          "https://desayunosydetalles.com.co/wp-content/uploads/2021/04/Candy-Sorpresa-obsequio-1.png"
        
        ],
        descripcionOne: "Una caja de regalo llena de detalles únicos para una ocasión especial.",
        descripcionTwo: "Incluye una mezcla de accesorios, velas aromáticas, una tarjeta escrita a mano.",
        categoria: "6764c9b1fcf1c1cd45ff3792", // Categoría para "Día especial"
        material: "Variado (accesorios, papel, velas)",
        dimensions: "30x30x20 cm",
        stock: 30,
        shippingTime: "2-4 días laborales",
        marca: "Memories&Co",
        deletedAt: null
      },
      {
        "_id": "6764cdc5c19f49b1f1ebabcde",
        "nombre": "Caja solpresa",
        "tipo": "dia especial",
        "precio": 303000,
        "images": [
          "https://i.pinimg.com/736x/87/33/5c/87335ce75d4da6bbd6ae3ae9ab62aba8.jpg",
          "https://i.pinimg.com/736x/69/ce/67/69ce67abfebe1ad1ee47a9a7c4b9ad26.jpg",
          "https://i.pinimg.com/736x/c6/d9/43/c6d94351fdf1d0a6d68b3773ddd18aa3.jpg"
        ],
        "descripcionOne": "Una caja de regalo llena de detalles únicos para una ocasión especial.",
        "descripcionTwo": "Incluye una mezcla de accesorios, velas aromáticas, una tarjeta escrita a mano.",
        "categoria": "6764c9b1fcf1c1cd45ff3792",
        "material": "Variado (accesorios, papel, velas)",
        "dimensions": "30x30x20 cm",
        "stock": 30,
        "shippingTime": "2-4 días laborales",
        "marca": "Memories&Co",
        "deletedAt": null
      },
      {
        "_id": "6764cdc5c19f49b1f1ebdefgh",
        "nombre": "caja de navidad",
        "tipo": "dia especial",
        "precio": 220000,
        "images": [
          "https://i.pinimg.com/736x/fd/d3/00/fdd300052370d7e12f151883a94d649a.jpg",
          "https://i.pinimg.com/736x/94/a6/85/94a68568b6b5a38f112bcba2a7d7008c.jpg",
          "https://i.pinimg.com/736x/09/be/89/09be892c6282ae508654f4b095b653bf.jpg"
        ],
        "descripcionOne": "Una caja de regalo llena de detalles únicos para navidad.",
        "descripcionTwo": "Incluye varias cosas como sacos, ropa o recuerdos.",
        "categoria": "6764c9b1fcf1c1cd45ff3792",
        "material": "Variado (accesorios, papel, velas)",
        "dimensions": "30x30x20 cm",
        "stock": 30,
        "shippingTime": "2-4 días laborales",
        "marca": "Memories&Co",
        "deletedAt": null
      }
      
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
