import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import connectDB from "../config/database.js";
import usersController from "../controllers/usersController.js";

// Wrapping the whole seeding process in an async IIFE (Immediately Invoked Function Expression)
(async function userSeeder() {
  try {
    // Connect to the database
    await connectDB();

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(
      process.env.SEEDER_USER_PASSWORD,
      10
    );

    // Create the user
    const user = await User.create({
      name: "Carlos Barragan",
      email: "Carlos@starwars.com",
      password: hashedPassword, // Use the hashed password
      phone: "1323123", // Phone stored as string
      address: "1239120341", // Address stored as string
    });

    // Check if the user was created successfully
    if (user) {
      console.log("[Seeder] User created successfully!");
    } else {
      console.log("[Seeder] Failed to create user.");
    }

    // Exit the process with success
    process.exit(0);
  } catch (error) {
    // Exit with error
    process.exit(1);
  }
})();
