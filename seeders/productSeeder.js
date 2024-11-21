import "dotenv/config";
import Product from "../models/product.js";
import connectDB from "../config/database.js";

const products = [
    {
      productID: "P001",
      name: "Laptop",
      description: "High performance laptop for gaming and productivity",
      price: 1200,
      stock: 10,
      categoryID: "66f061d7642e694660a5aa14", // Example category ID
      imagePath: "", // Make sure you have a path image for this
    },
    {
      productID: "P002",
      name: "Smartphone",
      description: "Latest model with advanced features",
      price: 800,
      stock: 20,
      categoryID: "66f061d7642e694660a5aa14", // Example category ID
      imagePath: "",
    },
   
  ];
  
  const productSeeder = async () => {
    try {
      // Connect to the database
      await connectDB();
  
      // Delete existing products 
      //await Product.deleteMany();
      //console.log("Existing products deleted");
  
      // Insert new products
      const insertedProducts = await Product.insertMany(products);
      console.log("Products seeded:", insertedProducts);
  
      // Exit process after completion
      process.exit(0);
    } catch (error) {
      console.error("Error seeding products:", error);
      process.exit(1);
    }
  };
  
  productSeeder();